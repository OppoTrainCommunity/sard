import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const PROJECT_ID = process.env.GCP_PROJECT_ID ?? "sard-508612";

function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  // On Cloud Run, Application Default Credentials are used automatically.
  // For local development, set FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY
  // from a downloaded service account key (see .env.local.example).
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId: PROJECT_ID, clientEmail, privateKey }),
      projectId: PROJECT_ID,
    });
  }

  return initializeApp({ projectId: PROJECT_ID });
}

export const adminApp = getAdminApp();
export const db = getFirestore(adminApp);
