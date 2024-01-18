import express from 'express';
import { ProductManager } from './productmanager.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js'; 

const app = express();
const PORT = 8080;

export const productManager = new ProductManager();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter); 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


