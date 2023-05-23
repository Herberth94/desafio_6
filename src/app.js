import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import http from 'http'
import { __dirname } from "./utils.js";
import { routerProducts } from "./routes/productsRouter.js";
import morgan from "morgan";
import  { routerRealtime }  from "./routes/realtimeRouter.js";
const app = express();
const port = 8080;
const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
// Enpoints
app.use('/api/products',routerProducts);
app.use('/realtimeproducts', routerRealtime);
// websocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');
});
server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });



    

