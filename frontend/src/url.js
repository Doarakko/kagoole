import dotenv from "dotenv";

dotenv.config();

export const api = process.env.REACT_APP_BACKEND_URL;
export const base = process.env.REACT_APP_FRONTEND_URL;
