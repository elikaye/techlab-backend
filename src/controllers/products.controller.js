import { productsService } from '../services/products.service.js';

export const productsController = {
  async getAll(req, res, next) {
    try {
      const products = await productsService.listAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.getOne(id);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = req.body;
      const created = await productsService.createProduct(data);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await productsService.deleteProduct(id);
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await productsService.updateProduct(id, data);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
};
