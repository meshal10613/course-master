import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./config/db.js";

const app = express();
const port = config.server.port || 3000;

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//* Connect to MongoDB
connectDB().then(() => console.log("MongoDB Connected to Server.js"));

//* Root
app.get("/", async(req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is locally running on port http://localhost:${port}`);
});