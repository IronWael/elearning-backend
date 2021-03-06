const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const mongoose = require('./configdb/db');

const userController = require('./controllers/userController');
const instructorController = require('./controllers/instructorController');
const classroomController = require('./controllers/classroomController');
const RequestsClassroomController = require('./controllers/requestsClassroomController');

const Admin = require('./models/admin');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);
app.use('/instructor', instructorController);
app.use('/classroom', classroomController);
app.use('/requestsClassroom', RequestsClassroomController);

app.get('/', function (req, res) {
    res.send("Welcome to the server !");
})

app.listen(3000, async () => {

    try {
        let admins = await Admin.find();
        if (admins.length == 0) {
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync("123456789", salt);
            let admin = new Admin({
                email: "admin@gmail.com",
                password: hashedPassword
            })
            let savedAdmin = await admin.save();
            console.log("Admin Added");
        }
        
        console.log("Server Stated !");
    } catch (error) {
        console.log(error);
    }

});