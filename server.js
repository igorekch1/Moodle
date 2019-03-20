const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const Sequelize = require('sequelize');
const port = process.env.PORT || 5000;

const sequelize = new Sequelize('moodle', 'root', 'Kingkongloxlox123',  {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
}); 

// ------------------TODO------------------
// For users table add columns : permision(r/w/crud), entity, entityId, list (slice)
//                                         read        post    100500  "1(id), admin(role), #5(group)"
//                                         read        user       5    "#5(group), user(role), admin 5lvl(role)"  
// NEED TO BE CACHED

// const AccessRights = sequelize.define('accessRights', {
//     permission : Sequelize.STRING,
//     model: Sequelize.STRING,
//     modelId: Sequelize.INTEGER,
//     list: {type: Sequelize.TEXT, {
//         get() {
//             return this.getDataValue("slice".split(","))
//         },
//         set(newValue) {
//             newValue = "length" in newValue ? newValue.join(",") : newValue
//             return this.setDataValue("slice", newValue)
//         }
//     }, {
//         getterMethods: {
//             async all() {

//             }
//         },
//         indexes : {
//             {
//                 fields: {"modelId", "model", "permission"}
//             },
//         }
//     });

//-----------------------------------------

const User = sequelize.define('users', {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue : "user"
    }
});

const Course = sequelize.define('courses', {
    name: Sequelize.STRING
});

const Topic = sequelize.define('topics', {
    name: Sequelize.STRING,
    content: Sequelize.TEXT('long'),
    courseId: Sequelize.INTEGER
});

const Test = sequelize.define('test', {
    name: Sequelize.STRING
});

const Question = sequelize.define('question', {
    testId: Sequelize.INTEGER,
    name: Sequelize.STRING,
    type : Sequelize.ENUM("CHECKBOX","RADIOBUTTON")
});

const Answer = sequelize.define('answer', {
    testId: Sequelize.INTEGER,
    name: Sequelize.STRING // then split + join (checkboxes)
});

User.belongsToMany(Course,{through: "user_course"});
Course.belongsToMany(User,{through: "user_course"});

Course.hasMany(Topic);
Topic.belongsTo(Course);

Topic.hasMany(Test);
Test.belongsTo(Topic);

Test.hasMany(Question);
Question.belongsTo(Test);

Test.hasMany(Answer);
Answer.belongsTo(Test);

User.belongsToMany(Test, {
    through: "user_test"
});
Test.belongsToMany(User, {
    through: "user_test"
});

sequelize.sync();

app.use (express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieSession({
        name: 'session',
        keys: 'TopSecret'
    })
);

//------- Post a new Course w/ checking if exists -------
app.post('/courses', async(req,res) => {
    let checkCourse = await Course.findOne({
        where : {
            name : req.body.name
        }
    })

    if (!checkCourse) {
        let newCourse = await Course.create({
            name : req.body.name
        });
        res.status(201);
        res.end(JSON.stringify(newCourse));
    } else {
        res.status(409);
        res.end(JSON.stringify(newCourse));
        throw new Error("Course already exists");
    }
});

//------- GET ALL COURSES -------
app.get('/courses', async(req,res) => {
    let courses = await Course.findAll();
    res.status(200);
    res.end(JSON.stringify(courses));
});
//-------------------------------

//------- Post a new Topic w/ checking if exists -------
app.post('/topics/:courseId', async(req,res) => {
    let checkTopic = await Topic.findOne({
        where : {
            name : req.body.name
        }
    })

    if (!checkTopic) {
        let newTopic = await Topic.create({
            name : req.body.name,
            content : req.body.content,
            courseId : req.params.courseId
        });
        res.status(201);
        res.end(JSON.stringify(newTopic));
    } else {
        res.status(409);
        res.end(JSON.stringify(newTopic));
        throw new Error("Topic already exists");
    }
});
//-------------------------------------------------------

//------- GET ALL TOPICS FROM CONCRETE COURSES -------
app.get('/topics/:courseId', async(req,res) => {
    let courseId = await Course.findById(req.params.courseId);
    let topics = await courseId.getTopics();
    res.status(200);
    res.end(JSON.stringify(topics)); 
});
//----------------------------------------------------

//------- Login w/ checking the role og user(teacher/student) --------
app.post('/login', async(req,res) => {
    let checkUser = await User.findOne({
        where : {
            login: req.body.login,
            password: req.body.password
        }
    })
    console.log(JSON.stringify(checkUser))
    if (checkUser) {
        checkUser = JSON.parse(JSON.stringify(checkUser));
        req.session.auth = checkUser;
        req.session.auth.loggedIn = true;
        res.write(JSON.stringify(req.session.auth))
        res.status(200);
        console.log(req.session.auth);
        res.end();  
    } else {
        res.status(409);
        res.end();
    }
});
//--------------------------------------------------------------------

//---------------- SIGNUP ------------------
app.post('/signup', async(req, res) => {
    let checkIfExists = await User.findOne({
        where: {
            login: req.body.login
        }
    })
    console.log(!checkIfExists)
    if (!checkIfExists) {
        let user = await User.create({
            login: req.body.login,
            password: req.body.password,
            role: req.body.role
        })
    
        res.status(201);
        res.end(JSON.stringify({created: true}))
    } else {
        res.status(409);
        res.end(JSON.stringify({created: false}));
    }
});
//------------------------------------------

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});