// src/admin/firebaseAdmin.ts

import admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export { admin, db };
