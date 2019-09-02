const express = require('express');
const passport = require('passport');
const socketioJwt = require('socketio-jwt');

const config = require('../config');
const Course = require('../models/courseModel');
const Group = require('../models/groupModel');
const Form = require('../models/formModel');
const Topic = require('../models/topicModel');
const Comment = require('../models/commentModel');


// TODO : improve async requests

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

    api.get('/verificationRequest',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            res.status(200).send(req.user);
    });

    api.get('/getCourses',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Course.find({}, (err, courses) => {
                if (err) console.log(err);
                else res.status(200).send(courses);
            })
    });

    api.get('/getAvailableForms',
        passport.authenticate('jwt', {session: false}),
        async (req, res) => {
            const userGroups = req.user.groups; 
            let availableForms = [];

            try {
                for (let i = 0 ; i < userGroups.length ; i++) {
                    await Form.find({"relatedGroup": userGroups[i]}, (err, groups) => {
                        if (err) console.log(err);
                        groups.forEach(grp => availableForms.push(grp));
                    })
                }
            }

            finally {
                console.log(availableForms);
                res.status(200).send(availableForms);
            }
    });

    api.get('/getInfosAboutGroups',
        passport.authenticate('jwt', {session: false}),
        async (req, res) => {
            const userGroups = req.user.groups; 
            let groupsInfos = {};

            try {
                for (let i = 0 ; i < userGroups.length ; i++) {
                    await Group.findById(userGroups[i], (err, result) => {
                        if (err) console.log(err);
                        groupsInfos[result._id] = result;
                    })
                }
            }

            finally {
                console.log(groupsInfos);
                res.status(200).send(groupsInfos);
            }
    });

    api.post('/getGroups',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Group.find({"courseLabel": req.body.data.courseLabel}, (err, groups) => {
                if (err) console.log(err);
                else res.status(200).send(groups);
            })
    });

    api.post('/setForm', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Group.find({"courseLabel": req.body.data.selectedCourse, "name": req.body.data.selectedGroup}, (err, group) => {
                if (err) console.log(err);
                else {
                    const newForm = new Form();
                    newForm.name = req.body.data.question;
                    newForm.a1 = req.body.data.answer1;
                    newForm.a2 = req.body.data.answer2;
                    newForm.a3 = req.body.data.answer3;
                    newForm.a4 = req.body.data.answer4;
                    newForm.a5 = req.body.data.answer5;
                    newForm.relatedGroup = group[0]._id;
                    newForm.completedBy = [];
                    newForm.save((err) => {
                    if (err) console.log(err);
                    else res.status(200).send("Successfully created form !");
                    });
                }
            })
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

    api.post('/answerForm', 
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log(req.body.data);
            const update = {$push: { completedBy: { studentId: req.user._id, answer: req.body.data.submittedAnswer } }};
            Form.findByIdAndUpdate(req.body.data.formId, update)
            .then((success, err) => {
                if (err) console.log(err);
                else res.status(200).send("Successfully submitted ")
            })
    });

    api.get('/getTopics/',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log(req.user.groups[0]);
            Topic.find({group: req.user.groups[0].toString()}, (err, topics) => {
                res.json(topics)
            });
    });

    api.post('/setTopic/',
        passport.authenticate('jwt', {session: false}),
        (req, res)=> {
            const newTopic = new Topic();
            newTopic.author = req.user.username;
            newTopic.topic = req.body.topic;
            newTopic.save((err) => {
                if(err) console.log(err.request);
                else res.status(200).send("Successfully created topic");

            });
    });


    api.post('/setComment',
        passport.authenticate('jwt', {session: false}),
        (req, res)=> {
            
            const newComment = new Comment();
            newComment.username = req.user.username;
            newComment.date = req.body.date;
            newComment.comment = req.body.comment;
            newComment.likes = 0;
            newComment.topic = req.body.topic;
            newComment.save((err) => {
                if(err){
                    console.log(err);
                }else{
                    res.status(200).send("Successfully created comment");
                } 
            });
    });

    api.get('/getComments/:topic',
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            // res.send(req.params.likes)
            // var nom_topic = req.param('likes');

            // console.log('get Comments');
            Comment.find({topic: req.params.topic.toString()}, (err, comments) => {
                res.json(comments)
            });
    });



    return api;
}