import express from 'express';
import cors from 'cors';
import * as db from "./src/config/db/initialDate.js";
import CheckToken from './src/config/auth/CheckToken.js';
import UserRoutes from './src/modules/user/routes/UserRoutes.js'

// Criando dados inicias para teste
db.createInitialDate()

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(UserRoutes);
app.use(CheckToken);

app.get("/api/status", (req, res) => {
    return res.status(200).json({
        service: "Auth-API",
        status: "UP",
        httpStatus: 200,
    });
});

app.listen(PORT, () => {
    console.info(`Server started and listening at port ${PORT}`)
})


