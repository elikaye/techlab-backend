import { db } from '../config/firebase.js';
const COLLECTION = process.env.FIRESTORE_COLLECTION_PRODUCTS || 'products';

export const productModel = {
  async getAll() {
    const snapshot = await db.collection(COLLECTION).get();
    const products = [];
    snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
    return products;
  },

  async getById(id) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async create(data) {
    const ref = await db.collection(COLLECTION).add(data);
    const newDoc = await ref.get();
    return { id: newDoc.id, ...newDoc.data() };
  },

  async update(id, data) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;
    await ref.update(data);
    const updated = await ref.get();
    return { id: updated.id, ...updated.data() };
  },

  async delete(id) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;
    await ref.delete();
    return true;
  }
};
