import { db } from '../config/firebase.js';

const COLLECTION = process.env.FIRESTORE_COLLECTION_PRODUCTS || 'products';

async function seed() {
  try {
    const docRef = db.collection(COLLECTION).doc();
    await docRef.set({
      name: 'Remera bebé - Ejemplo',
      price: 1500,
      description: 'Remera de algodón, talle 3-6 meses',
      category: 'bebé',
      stock: 12,
      createdAt: new Date().toISOString()
    });
    console.log('Seed completado');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
