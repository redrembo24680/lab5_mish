import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let firebaseConfig;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
        firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        console.log('✅ Using Firebase Service Account from JSON string');
    } catch (e) {
        console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e.message);
    }
}

if (!firebaseConfig) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
        privateKey = privateKey.replace(/\\n/g, '\n').trim();
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.substring(1, privateKey.length - 1);
        }
    }
    firebaseConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    };
}

if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
    console.warn('⚠️ Firebase Admin environment variables are missing. Firestore will not work!');
} else {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig)
        });
        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.error('❌ Firebase Admin init error:', error.message);
    }
}

export const db = admin.apps.length ? admin.firestore() : null;
export default admin;
