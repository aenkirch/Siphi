const express = require('express');
const passport = require('passport');
const socketioJwt = require('socketio-jwt');

const config = require('../config');
const Form = require('../models/formModel');

module.exports = ({app, io}) => {

    const api = express.Router(app);

    io.use(socketioJwt.authorize({
        secret: config.TOKEN_SECRET,
        handshake: true
    }));
      
    io.on('connection', socket => {
        console.log('A client just joined on', socket.id);

        socket.on('message', (msg) => {
            console.log(msg[0].text);
        });

    });

    api.get('/getGroups',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log('oui !');
            res.status(200).send('hey');
    });

    api.post('/setForm', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            const newForm = new Form();
            newForm.name = req.body.question;
            newForm.a1 = req.body.answer1;
            newForm.a2 = req.body.answer2;
            newForm.a3 = req.body.answer3;
            newForm.a4 = req.body.answer4;
            newForm.a5 = req.body.answer5;
            newForm.save((err) => {
            if (err) console.log(err);
            else res.status(200).send("Successfully created form !");
            });
    });

    return api;
}