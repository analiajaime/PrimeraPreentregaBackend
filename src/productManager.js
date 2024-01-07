import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';

export class ProductManager 

    constructor() { 
        this.path = 'products.json';
        this.products = [];
    }

    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
        try {
            
            let products = await this.getProducts();
            if (!Array.isArray(products)) {
                products = [];
            }
    
            const newProduct = {
                id: uuidv4(), 
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock, 
                status, 
                category
            };
    
            
            products.push(newProduct);
    
            
            await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
            
            return newProduct;
        
    
        } catch (error) {
            
            console.error('Error en addProduct:', error);
            throw error; 
    }
}
    

    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, 'utf-8');
            const responseJSON = JSON.parse(response);
            return responseJSON;

        } catch (error) {
            console.log('Error en getProducts');
        }
    }

    getProductById = async (id) => {
        try {
            const response = await this.getProducts();
            const product = response.find(product => product.id === id);
            return product;

        } catch (error) {
            console.log('Product not found');
        }
    }

    updateProduct = async (id, {title, description, price, thumbnail, code, stock, status, category}) => {
        try {
            this.products = await this.getProducts();
            const productIndex = this.products.findIndex(product => product.id === id);
            this.products[productIndex] = {id, title, description, price, thumbnail, code, stock, status, category};
            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            return this.products[productIndex];

        } catch (error) {
            console.log('Product not found');
        }
    }

    deleteProduct = async (id) => {
        try {
            this.products = await this.getProducts();
            const productIndex = this.products.findIndex(product => product.id === id);
            const product = this.products[productIndex];
            this.products.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            return product;

        } catch (error) {
            console.log('Product not found');
        }
    }

    getProductsByCategory = async (category) => {
        try {
            const response = await this.getProducts();
            const products = response.filter(product => product.category === category);
            return products;

        } catch (error) {
            console.log('Product not found');
        }
    }

    getProductsByCode = async (code) => {
        try {
            const response = await this.getProducts();
            const products = response.filter(product => product.code === code);
            return products;

        } catch (error) {
            console.log('Product not found');
        }
    }

    getProductsByPrice = async (price) => {
        try {
            const response = await this.getProducts();
            const products = response.filter(product => product.price === price);
            return products;

        } catch (error) {
            console.log('Product not found');
        }
    }

    getProductsByStatus = async (status) => {
        try {
            const response = await this.getProducts();
            const products = response.filter(product => product.status === status);
            return products;

        } catch (error) {
            console.log('Product not found');
        }
    }

    getProductsByTitle = async (title) => {
        try {
            const response = await this.getProducts();
            const products = response.filter(product => product.title === title);
            return products;

        } catch (error) {
            console.log('Product not found');
        }
    }

}
