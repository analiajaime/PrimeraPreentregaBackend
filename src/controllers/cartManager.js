// Importaciones
import express from 'express'; // Importa express
import { promises as fs } from 'fs'; // Utiliza 'fs' para operaciones de archivos con promesas
import { v4 as uuidv4 } from 'uuid';  // Importa 'uuidv4' para generar IDs únicos

// Clase cartManager para gestionar carritos de compras
export class cartManager {
    constructor() {
        this.path = './src/models/cart.json'; // Define la ruta al archivo JSON de los carritos
    }

    // Obtiene todos los carritos desde el archivo JSON
    async getCarts() {
        const response = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(response);
    }

    // Obtiene productos de un carrito específico por su ID
    async getCartProducts(id) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart.products;
    }

    // Crea un nuevo carrito con un ID único y lo añade al archivo JSON
    async newCart() {
        const carts = await this.getCarts();
        const newCart = { id: uuidv4(), timestamp: Date.now(), products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return newCart;
    }

    // Añade un producto a un carrito. Si ya está presente, aumenta la cantidad
    async addProductToCart(cart_id, product_id) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cart_id);
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(product => product.id === product_id);
        if (productIndex === -1) {
            cart.products.push({ id: product_id, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
    }
}

// Exporta una instancia de cartManager para uso global
export const cartManager = new cartManager();
