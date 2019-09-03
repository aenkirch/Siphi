<h1 align="center">
Siphi
</h1>

<p align="center">
    This is an hybrid app developed in React Native you can use to manage your university lectures as a teacher, create a real interaction between you and your students.
</p>

<p align="center">
    <img src="./docResources/appLogo.png" alt="Siphi logo" />
</p>

---
## Some context

This project was developed during a few months as a school project for Paris Descartes University : therefore, the database used on the demo was provided by our teacher.

![Chat Preview](./docResources/bigLogoIUT.jpg)

---

## Features provided in this version of the app

<ul>
    <li>Create and answer to forms</li>
    <li>Forum (Reddit-like) in order for students and teachers to talk about lectures</li>
    <li>Fully REST API with status codes adapted to requests on DB</li>
    <li>Confirmation of done action if one happened on DB displayed on a toast</li>
</ul>

---

## Setup

<i>Disclaimer : these are the instructions to run it on your phone using a cable connected to the computer, you may change these using how you want to run the project.</i>

<ol>
    <li>Be assured to have Node.js installed on your computer</li>
    <li>In the project’s folder, type <strong>npm install</strong> to install missing dependencies of the server side of the project</li>
    <li>Then in <strong>/client</strong>, type again <strong>npm install</strong> to install missing dependencies of the client side of the project</li>
    <li>Type <strong>npm start</strong> in the project folder</li> and the same command line into <strong>/client</strong> in another terminal
    <li>In a new terminal, type <strong>adb reverse tcp:3000 tcp:3000</strong></li>
    <li>Go at http://localhost:19002 and be sure to use a local connection to run your app, it should run much faster</li>
    <li>In the terminal you used to run the client side of the project, just type 'a' in order to </li> run your app on the phone
    <li>You‘re good to go !</li>
</ol>

---
## Technologies used

**Back-end** : Node.JS <br />
**Front-end** : React Native w/ Redux <br />
**Database** : MongoDB (stored on mLab for now) <br />

**Some other ones** : Passport.js, Socket.io

---
## Usage

<strong>npm start</strong> : if you type this command line when you're either in the `/` folder of the project, it will run the server side of the project only, if you run it in the `/client` folder of the project, it will run only the client side of the project

<strong>adb reverse tcp:3000 tcp:3000</strong> : you have to type this command line on the terminal after you‘ve launched the app in order to setup the connection between your PC and your phone


---

## Structure of the project

The project is split in two parts : the **root** directory which is opened on the server side and the **client** directory which is opened on the client side.

Files opened on <strong>server side </strong> offer a REST API which communicates with the mongoDB server : this REST API offers basic CRUD (Create/Read/Update/Delete) services.

Files opened on <strong>client side </strong> offer an interface in order for the user to launch actions on the database or just in order to see the scheduler.

---

## Architecture of the project

The project uses an **MVC** architectural pattern : 
<ul>
    <li>Model : it's the database which was provided by our teacher, it's connected to the controller</li>
    <li>View : what the user sees when he's accessing the website, it's the React code you can see in the /client folder</li>
    <li>Controller : the server side of the project (/ folder) and acts as a middleware between the Model and the View of the project</li>
</ul>