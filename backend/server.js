import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/connection.js";
import User from "./src/models/user.model.js"

dotenv.config();

const Port = process.env.PORT || 5000;

const app = express();


app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = User(req.body);

    try {
        await user.save();
        res.send("User added successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }

})

app.delete("/user", async (req, res) => {

    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully!");

    } catch (err) {
        res.status(400).send("Error while deleting the user!" + err.message);

    }

})

// This is the api to find the user by email id ----------------------------------------------we have to update it (pending!)
// app.get("/user", async (req, res) => {
//     const emailId = req.query.emailId;

//     if (!emailId) {
//         return res.status(400).json({ message: "emailId is required" });
//     }

//     try {
//         const user = await User.findOne({ emailId });

//         if (!user) {
//             return res.status(404).json({ message: "User not found!" });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

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

