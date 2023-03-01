const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser  = require('cookie-parser')
mongoose.connect(
    "mongodb://localhost:27017/node_auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    });
  
    // var db = mongoose.connection;
    // db.on("error", console.error.bind(console, "connection error:"));
    // db.once("open", function callback() {
    //   console.log("MongoDB Connected...");
    // });

const app = express()
app.use(cookieParser())
app.use(cors({
    credential: true,
    origin :[ 'http://localhost:3000' ]
}))
const users = require('./routes/users')
app.use(express.json())
app.use('/users',users)

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
