import express from 'express';
import { ProductManager } from './productmanager.js';
const app = express();
const PORT = 8080;

export const productManager = new ProductManager();

