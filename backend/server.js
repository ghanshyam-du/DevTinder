import express from "express"
import dotenv from "dotenv"
import  {connectDB}  from "./src/config/connection.js";

dotenv.config();

const Port = process.env.PORT || 5000;

const app = express();




connectDB().then(() => {
    console.log("Database is connected Successflly!!");

    app.listen(Port, () => {
        console.log(`Server is successfully running on the port no ${Port}`);
    })
}).catch(err => {
    console.error(err);
})

