import express from "express";
import apiRouter from "./routes/api.routes"

const app = express();
const port = 3000;

app.use(express.json());
app.use(apiRouter);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})
