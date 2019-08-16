const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors')

const config = require('./config');
const loginRoute = require('./routes/passportLoginRegister');
const socket = require('./routes/protectedRoute');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

require('./passport');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next)=>{ res.locals['socketio'] = io; next(); });

app.use('/', loginRoute);
app.use('/api', socket({app, io}));

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected');
  if (err) console.log(err);
});

server.listen(config.LISTEN_PORT, () => {
  console.log('Server started and listening on port ' + config.LISTEN_PORT);
});