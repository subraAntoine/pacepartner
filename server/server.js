//server
require('dotenv').config();


//import
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { userRouter } = require("./routes/users");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/users", userRouter);



//connect to mongoDB
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@pacepartner.boyyazb.mongodb.net/`;

try {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("MongoDB connected"))
        .catch(error => console.log("Error connecting to MongoDB:", error));
} catch (error) {
    console.log(error);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//