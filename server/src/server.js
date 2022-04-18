const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGODB_URI;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

const server = http.createServer(app);

async function startServer () {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();


