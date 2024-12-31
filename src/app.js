import express from 'express';
import connectDB from './dbConnect.js';
import routes from './routes/index.js';

const app = express();
routes(app);

const connect = await connectDB();

connect.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connect.once("open", () => {
    console.log("Conexão realizada.");
});

export default app;