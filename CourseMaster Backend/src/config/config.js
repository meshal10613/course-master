import dotenv from "dotenv";
import path from "path";

dotenv.config(path.join(process.cwd(), ".env"));

const config = {
	database: {
		db_name: process.env.DB_NAME,
		mongodb_uri: process.env.MONGODB_URI,
	},
	server: {
		port: process.env.PORT,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
};

export default config;