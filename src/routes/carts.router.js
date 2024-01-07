import { Router } from "express";
import { CartManager } from "../cartManager.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    try {
        const cart = await CartManager.newCart();
        res.json(cart);
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).send('Error al crear carrito');
    }
});

cartsRouter.get('/:cid/products', async (req, res) => {
    try {
        const cartProducts = await CartManager.getCartProducts(req.params.cid); // Changed from cart_id to cid
        res.json(cartProducts);
    } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
        res.status(500).send('Error al obtener productos del carrito');
    }
});

cartsRouter.post('/:cid/products/:product_id', async (req, res) => {
    try {
        const cart = await CartManager.addProductToCart(req.params.cid, req.params.product_id); // Consistent parameter name
        res.json(cart);
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).send('Error al agregar producto al carrito');
    }
});

export { cartsRouter };
