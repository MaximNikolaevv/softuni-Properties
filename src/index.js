import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import routes from "./routes.js";
import authMiddlewares from '../AuthMiddleWares/AuthMiddleWare.js';
import cookieParser from 'cookie-parser';


const app = express();


async function start() {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./Static'));


    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
    }));

    app.set('view engine', 'hbs');
    app.set('Views', './Views');



    const uri = "mongodb://localhost:27017/Home"; 
    await mongoose.connect(uri); 
    console.log("Connected to MongoDB");


    app.use(cookieParser());
    app.use(authMiddlewares);
    app.use(routes);

    const APP_PORT = 3000;

    app.listen(APP_PORT, () => {
        console.log(`Server is running on http://localhost:${APP_PORT}`);
    });

}

start();