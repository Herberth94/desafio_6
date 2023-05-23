import express from "express"
import { ProductManager } from "../utils/productManager.js";
import { io } from "../app.js";
export const routerRealtime = express.Router();
const product = new ProductManager();

routerRealtime.get('/', async (req,res)=>{
    const result = await product.getProducts();
    res.render('realTimeProducts',{data:result})
   
})
