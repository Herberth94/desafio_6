import{ ProductManager }from '../utils/productManager.js'
import { io } from '../app.js';
const product = new ProductManager();
const productsController = {}
productsController.allProducts = async(req, res)=>{
      try {
        console.log(0)
        const allProduct = await product.getProducts();
        const {limit} = req.query
        if(parseInt(limit) == 0){
          
           res.render('home', {data:allProduct});
           }
        else{
           const newArray = allProduct.slice(0,limit)
           res.render('home', {data:allProduct});;
           
        }
        } catch (error) { res.status(401).send(error)};
}

productsController.pidProducts = async(req,res)=>{
    try {
        const { pid } = req.params;
        const idProduct = await product.getProductById(pid);
        if(idProduct == true){
           res.status(404).send({status:'not found' , data:'The object does not exist'});
        }
        else{
           res.status(200).send({status:'success',data:idProduct});
        }
        
     } catch (error) {
        res.status(404).send(error);     
     }
}
productsController.addProducts = async (req,res)=>{
     try {
        let {title,description,price,thumbnail,status,category,code,stock}= req.body
        if(thumbnail==''){ thumbnail = 'sin imagen'}
        const result = await product.addProduct(title,description,price,thumbnail,status,category,code,stock);
        if(result){
         const allProduct = await product.getProducts();
         io.emit('realTime',allProduct);
         res.status(200).send({status:'success'})}
        else{res.status(404).send({status:'error' , data:'Check that the fields are filled in'})}
    } catch (error) {
        res.status(404).send(error);
    }
}

productsController.deleteProducts = async (req,res)=>{
   try {
      const {pid} = req.params
      
      console.log(pid)
      const result = await product.deleteProduct(pid);
      if(result){
         const allProduct = await product.getProducts();
          io.emit('realTime',allProduct)
          res.status(200).send({status:'success'})
         }
      else{res.status(404).send({status:'error' , data:'Not found'})}

      
   } catch (error) {
      res.status(404).send(error);
   }
}

productsController.updateProducts = async(req,res)=>{
   try {
      const {pid}= req.params
      const{updateField , newValue} =req.body
      const result = await product.updateProduct(pid,updateField,newValue);
      if(result){ res.status(200).send({status:'success'})}
      else{res.status(404).send({status:'error' , data:'Not found'})}
      
   } catch (error) {
      res.status(404).send(error);
      
   }
}

export default productsController;