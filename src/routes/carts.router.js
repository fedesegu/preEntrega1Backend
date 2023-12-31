import { Router } from "express";
import { cartsManager } from "../CartsManager.js";
const router = Router();

app.post('/', (req, res) => {
    try {
      const newCart = cartsManager.createCart();
      res.status(201).json({ message: 'Cart created', cart: newCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartsManager.getCartById(+cid);
      if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }
      res.status(200).json({ message: 'products in the cart', products: cart.products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      await cartsManager.addProductToCart(+cid, +pid, quantity);
      res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
export default router;