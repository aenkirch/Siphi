const express = require('express');
const passport = require('passport');
const socketioJwt = require('socketio-jwt');

const config = require('../config');
const Course = require('../models/courseModel');
const Group = require('../models/groupModel');

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

    api.get('/getCourses',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Course.find({}, (err, courses) => {
                if (err) console.log(err);
                else res.status(200).send(courses);
            })
    });

    api.post('/getGroups',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Group.find({"courseLabel": req.body.data.courseLabel}, (err, groups) => {
                if (err) console.log(err);
                else res.status(200).send(groups);
            })
    });

    api.get('/getUserClasses',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log(req.user);
            res.status(200).send(req.user.classesIds);
    });

    api.post('/setForm', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            const newForm = new Form();
            newForm.name = req.body.data.question;
            newForm.a1 = req.body.data.answer1;
            newForm.a2 = req.body.data.answer2;
            newForm.a3 = req.body.data.answer3;
            newForm.a4 = req.body.data.answer4;
            newForm.a5 = req.body.data.answer5;
            newForm.save((err) => {
            if (err) console.log(err);
            else res.status(200).send("Successfully created form !");
            });
    });

    api.post('/setCourse', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log(req.body.data);
            const newCourse = new Course();
            newCourse.name = req.body.data.name;
            newCourse.label = req.body.data.label;
            newCourse.save((err) => {
            if (err) console.log(err);
            else res.status(200).send("Successfully created a new course !");
            });
    });

    api.post('/setGroup', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log(req.body.data);
            const newGroup = new Group();
            newGroup.name = req.body.data.name;
            newGroup.label = req.body.data.name.replace(' ', '');
            newGroup.courseLabel = req.body.data.courseLabel;
            newGroup.save((err) => {
            if (err) console.log(err);
            else res.status(200).send("Successfully created a new group !");
            });
    });

    return api;
}