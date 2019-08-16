<h1 align="center">
Siphi
</h1>

---
## Where are we at this stage of the development ?

<ul>
    <li>Auth is fully implemented using JWTs.</li>
    <li>Creating forms worked using Socket.io but I’m now developing it using an API request. Basis is functional.</li>
    <li>Chat works (optional feature developed in order to test websockets)</li>
    <li></li>
</ul>

---
## What‘s left to do/finish ?

<ul>
    <li>Forum</li>
    <li>Answering to forms</li>
    <li>Assigning students and teachers to new classes/lectures</li>
    <li>QR Codes for marking students as present</li>
    <li>Some interactions in order to have a beautiful design !</li>
</ul>

---
## Features we aims to provide

<ul>
    <li>Create and answer to forms</li>
    <li>Show present students in an amphitheatre</li>
    <li>Statictics about forms answering (percentage of wrong answers for example)</li>
    <li>Forum (Reddit-like) in order for students and teachers to talk about lectures</li>
</ul>

---
## Technologies used

**Back-end** : Node.JS <br />
**Front-end** : React Native w/ Redux <br />
**Database** : MongoDB (stored on mLab for now) <br />

**Some other ones** : Passport.js, Socket.io

---
## Usage

<strong>yarn dev</strong> : type this command line when you've finished the setup section, it runs the server side of the project and the client side of the project at the same time to run the full app

<strong>yarn start</strong> : if you type this command line when you're either in the `/` folder of the project, it will run the server side of the project only, if you run it in the `/client` folder of the project, it will run only the client side of the project
