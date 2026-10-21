// Firebase configuration for portfolio analytics
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use an existing one)
// 3. Go to Project Settings > General > "Your apps" > Click Web icon (</>)
// 4. Register your app and copy the config values below
// 5. Go to Realtime Database > Create Database > Start in TEST mode
// 6. Update the rules to allow read/write for analytics:
//    {
//      "rules": {
//        "analytics": {
//          ".read": true,
//          ".write": true
//        }
//      }
//    }
//
// Replace the placeholder values below with your actual Firebase config:

import { initializeApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const app = initializeApp(firebaseConfig);
export const database: Database | null = firebaseConfig.databaseURL
  ? getDatabase(app)
  : null;
export default app;
