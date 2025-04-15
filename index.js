const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser")
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// const cors = require('cors');

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port no. ${process.env.PORT}`);
});


app.use(cors());

app.use(cors({
  origin: 'https://universitymanagementsystem1.netlify.app'
}));

// In your server (index.js or server.js)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}