import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';


export class CartManager.js {
    constructor () {
        this.path = './src/cart.json';
        this.carts = [];
    }

getCarts = async () => {
    const response = await fs.readFile(this.path, 'utf-8');
    const responseJson = JSON.parse(response);
    return responseJson;
    }

getCartProducts = async (id) => {
    const carts = await this.getCarts();
    const cart = carts.find(cart => cart.id === id);
    if (!cart) {
        console.error('Carrito no encontrado');
        return null;
    } else {
        return cart.products;
    }
    }

newCart = async () => {
    const carts = await this.getCarts();
    const newCart = {id: uuidv4(), timestamp: Date.now(), products: []};
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    return newCart;
    }

addProductToCart = async (cart_id, product_id) => {   
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cart_id);
    if (cartIndex === -1) {
        console.error('Carrito no encontrado');
        return null;
    }
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(product => product.id === product_id);
    if (productIndex === -1) {
        cart.products.push({id: product_id, quantity: 1});
    } else {
        cart.products[productIndex].quantity++;
    }
    await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    return cart;
    }
}

}