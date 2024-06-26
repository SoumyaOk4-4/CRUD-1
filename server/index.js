const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo = process.env.MONGO_URL|| "mongodb+srv://soumya:1234@cluster0.y20d7vp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());


//schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
}, {
    timestamps: true
});

//model
const userModel = mongoose.model("people-test", schemaData);

//api
///read 
////http://localhost:5000 
app.get("/", async (req, res) => {
    const data = await userModel.find({});

    res.send({ message: "fetched", data: data, success:true });
});

///create 
////http://localhost:5000/create 
app.post("/create", async (req, res) => {
    const data = await userModel.create(req.body);

    res.send({ message: "created", data: data, success:true });
});

///update
////http://localhost:5000/update 
app.put("/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await userModel.updateOne({ _id: _id }, rest);

    res.send({ message: "updated", data: data, success:true });
});

///delete
////http://localhost:5000/delete/<id>
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await userModel.deleteOne({ _id: id });

    res.send({ message: "deleted", data: data, success:true });
});

//db connection
mongoose.connect(mongo)
    .then(() => {
        console.log(`db connected...`);
        app.listen(port, () => {
            console.log(`server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
