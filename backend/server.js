import express from "express"
import dotenv from "dotenv"
import  {connectDB}  from "./src/config/connection.js";
import User from "./src/models/user.model.js"

dotenv.config();

const Port = process.env.PORT || 5000;

const app = express();


app.use(express.json());

app.post("/signup",async (req, res)=>{

    const user = User(req.body);

    try{
      await user.save();
      res.send("User added successfully!");
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message);
    }

})
// This api will send you all the data from the databases
app.get("/feed", async (req, res) => {
    try {
        const userInfo = await User.find({});
        res.json(userInfo);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});


connectDB().then(() => {
    console.log("Database is connected Successflly!!");

    app.listen(Port, () => {
        console.log(`Server is successfully running on the port no ${Port}`);
    })
}).catch(err => {
    console.error(err);
})

