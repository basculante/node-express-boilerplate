import express from "express";
import Morgan from "./middleware/morgan";

const port = process.env.PORT || 4000;
const app = express();

app.use(Morgan);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
