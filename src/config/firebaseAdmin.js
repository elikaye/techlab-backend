
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// Necesario para poder usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta hacia tu JSON dentro de /config
const serviceAccountPath = path.join(__dirname, "techlab-backend-c671b-firebase-adminsdk-fbsvc-cd2bcf5244.json");

// Inicializar Firebase Admin solo si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: "https://techlab-backend-c671b.firebaseio.com",
  });
}

export default admin;
