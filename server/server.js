import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import { fileURLToPath } from 'url';
import path from 'path';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use(express.static(path.join(currentDir, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});