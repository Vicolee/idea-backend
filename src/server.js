import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/idea';

mongoose.connect(mongoURI).then(() => {
  console.log('connected to database:', mongoURI);
}).catch((err) => {
  console.log(`error: could not connect to db: ${mongoURI}`, err);
});

var app = express();

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use(cors({ origin: true, credentials: true }))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);