import { productModel } from '../models/product.model.js';

export const productsService = {
  async listAll() {
    return await productModel.getAll();
  },

  async getOne(id) {
    return await productModel.getById(id);
  },

  async createProduct(data) {
    if (!data.name || data.price === undefined) {
      const err = new Error('Faltan campos obligatorios: name, price');
      err.status = 400;
      throw err;
    }
    return await productModel.create(data);
  },

  async deleteProduct(id) {
    const ok = await productModel.delete(id);
    if (!ok) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      throw err;
    }
    return true;
  },

  async updateProduct(id, data) {
    const updated = await productModel.update(id, data);
    if (!updated) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      throw err;
    }
    return updated;
  }
};
