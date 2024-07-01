const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/userRouter');
app.use(userRouter);

app.listen(3000, () => {
    console.log("server is listening at port 3000");
})