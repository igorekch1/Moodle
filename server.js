const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const Sequelize = require('sequelize');
// var session = require('express-session/
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
    name: Sequelize.STRING,
    description: Sequelize.STRING
});

const Topic = sequelize.define('topics', {
    name: Sequelize.STRING,
    content: Sequelize.TEXT('long'),
    courseId: Sequelize.INTEGER
});

const Test = sequelize.define('tests', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    time: Sequelize.INTEGER
});

const Question = sequelize.define('questions', {
    testId: Sequelize.INTEGER,
    questionText: Sequelize.STRING,
    answers: Sequelize.STRING,
    rightAnswer: Sequelize.STRING   
});

User.belongsToMany(Course,{through: "user_course"});
Course.belongsToMany(User,{through: "user_course"});

Course.hasMany(Topic, {
    onDelete: 'cascade'
});
Topic.belongsTo(Course);

Topic.hasMany(Test, {
    onDelete: 'cascade'
});
Test.belongsTo(Topic);

Test.hasMany(Question, {
    onDelete: 'cascade'
});
Question.belongsTo(Test);

User.belongsToMany(Test, {
    through: "user_test"
});

Test.belongsToMany(User, {
    through: "user_test"
});

sequelize.sync();

app.use (express.static('public'));
app.use(bodyParser.json());
app.use(
    cors({
        origin: process.env.FRONT_HOST || "http://localhost:3000",
        credentials: 'include'
    })
);
app.use(
        cookieSession({
                name: 'session',
                keys: ["key1", "key2"]
            })
        );
        
app.set("trust proxy", 1); // trust first proxy
// session
// app.use(
//     session({ 
//         secret: "topSecret", 
//         cookie: { 
//             maxAge: 60000, 
//             secure: false,
//             httpOnly: false
//         }
//     })
// );

//------- Post a new Course w/ checking if exists -------
app.post('/courses', async(req,res) => {
    let foundCourse = await Course.findOne({
        where : {
            name : req.body.name
        }
    })
    
    if (!foundCourse) {
        let newCourse = await Course.create({
            name : req.body.name,
            description: req.body.description
        });
        res.status(201);
        res.end(JSON.stringify(newCourse));
    } else {
        res.status(409).json({error: 'alreadyExists'})
    }
});

//------- UPDATE COURSE ---------
app.put('/courses/update', async(req,res) => {
    console.log(req.body)
    
    if (req.body.name) {
        let updatedCourse = await Course.update({
            name: req.body.name
        }, { 
            where : {id : req.body.id} 
        })
    } else {
        let updatedCourse = await Course.update({
            description: req.body.description
        }, { 
            where : {id : req.body.id} 
        })
    }
    
    let foundCourse = await Course.findOne({
        where : {
            id : req.body.id
        }
    })

    res.status(200);
    res.end(JSON.stringify(foundCourse));
})

//------- GET ALL COURSES -------
app.get('/courses', async(req,res) => {
    let courses = await Course.findAll();
    res.status(200);
    res.end(JSON.stringify(courses));
});
//-------------------------------

//-------------------- Delete course ---------------------
app.delete('/courses/del', async (req,res) => {
    let removedId = req.body.id;

    let removedCourse = await Course.destroy({
        where : {
            id: req.body.id
        }
    })
    res.status(200).end(JSON.stringify({removed: true, id: removedId}))
})
//-------------------------------------------------------

//------- GET ALL TOPICS FROM CONCRETE COURSES -------
app.get('/topics/:courseId', async(req,res) => {
    let courseId = await Course.findByPk(req.params.courseId);
    let topics = await courseId.getTopics();
    res.status(200);
    res.end(JSON.stringify(topics)); 
});
//----------------------------------------------------

//------- Create or Modify a new Topic w/ checking if exists -------
app.post('/topics/:courseId', async(req,res) => {
    let toCreate = req.body.createOrUpdate == null;
    
    if (toCreate) {
        let newTopic = await Topic.create({
            name : req.body.name,
            content : req.body.content,
            courseId : req.params.courseId
        });
        res.status(201);
        res.end(JSON.stringify(newTopic));
    } else {
        let foundTopic = await Topic.findOne({
            where : {
                id : req.body.createOrUpdate.id
            }
        })
        let updatedTopic = await Topic.update({
            name: req.body.name,
            content: req.body.content
        }, { 
            where : {id : foundTopic.id} 
        })

        res.status(200);
        res.end(JSON.stringify(foundTopic));
    }   
});
//-------------------------------------------------------

//-------------------- Delete topic ---------------------
app.delete('/topics/del', async (req,res) => {
    let removedId = req.body.id;

    let removedTopic = await Topic.destroy({
        where : {
            id: req.body.id
        }
    })
    res.status(200).end(JSON.stringify({removed: true, id: removedId}))
})
//-------------------------------------------------------

//------- GET ALL TESTS FROM CONCRETE TOPIC -------
app.get('/tests/:topicId', async(req,res) => {
    let topicId = await Topic.findByPk(req.params.topicId);
    let tests = await topicId.getTests();
    
    res.status(200);
    res.end(JSON.stringify(tests)); 
});
//----------------------------------------------------

//------- Create new Test -------
app.post('/tests/:topicId', async(req,res) => {

    let foundTest = await Test.findOne({
        where : {
            name : req.body.name
        }
    });

    if(!foundTest){   
        let newTest = await Test.create({
            name : req.body.name,
            description: req.body.description,
            time : req.body.time,
            topicId : req.params.topicId
        });
        res.status(201);
        res.end(JSON.stringify(newTest));
    } else {
        res.status(409).json({error: 'alreadyExists'});
    }
});
//-------------------------------------------------------

//------- UPDATE TEST ---------
app.put('/tests/update', async(req,res) => {
    console.log(req.body)
    
    let updatedTest = await Test.update({
        name: req.body.name
    }, { 
        where : {id : req.body.id} 
    })
    
    let foundTest = await Test.findOne({
        where : {
            id : req.body.id
        }
    })

    res.status(200);
    res.end(JSON.stringify(foundTest));
})

//-------------------- Delete test ---------------------
app.delete('/tests/del', async (req,res) => {
    let removedId = req.body.id;

    let removedTest = await Test.destroy({
        where : {
            id: req.body.id
        }
    })
    res.status(200).end(JSON.stringify({removed: true, id: removedId}))
})
//-------------------------------------------------------

//------- GET ALL QUESTION FROM CONCRETE TEST -------
app.get('/questions/:testId', async(req,res) => {
    // console.dir(Topic.__proto__)
    console.dir(Test.__proto__.__proto__)
    let testId = await Test.findByPk(req.params.testId);
    let questions = await testId.getQuestions();
    console.log(JSON.stringify(questions))
    res.status(200);
    res.end(JSON.stringify(questions)); 
});
//----------------------------------------------------

//------- Create new Question -------
app.post('/questions/:testId', async(req,res) => {
    let rightAnswer;
    let answerArr = req.body.answers.split(",").map(item => {
        item = item.trim();
        if (item.startsWith("##")) {
            item = item.slice(2);
            rightAnswer = item;
        }
        return item;
    })
    
    let foundQuestion = await Question.findOne({
        where : {
            questionText : req.body.text
        }
    });

    if(!foundQuestion){   
        let newQuestion = await Question.create({
            questionText : req.body.text,
            answers: JSON.stringify(answerArr),
            rightAnswer,
            testId : req.params.testId
        });
        res.status(201);
        res.end(JSON.stringify(newQuestion));
    } else {
        res.status(409).json({error: 'alreadyExists'});
    }
});
//-------------------------------------------------------

//------------------- TEST RESULT -----------------------
app.post("/testresult", async(req,res) => {
    let answers = req.body.answers;
    let result = 0;

    answers.map(async (answer) => {
        let question = await Question.findOne({
            where: {
                id: Number(answer.id)
            }
        })
console.log("right - ",question.rightAnswer, typeof question.rightAnswer);
console.log("your answer - ",answer.chosenAnswer, typeof answer.chosenAnswer)
        if (question.rightAnswer === answer.chosenAnswer) {
            console.log("hellow from if")
            result = result + 1;
        }
    });

console.log("result - ",result);
    res.status(200).json({result});
})
//-------------------------------------------------------

//------- Login w/ checking the role og user(teacher/student) --------
app.post('/login', async(req,res) => {
    let checkUser = await User.findOne({
        where : {
            login: req.body.login,
            password: req.body.password
        }
    })
    if (checkUser) {
        checkUser = JSON.parse(JSON.stringify(checkUser));
        req.session.auth = checkUser;
        req.session.auth.loggedIn = true;
        delete req.session.auth.password;
        console.dir(JSON.stringify(req.session.auth));
        res.status(200).end(JSON.stringify(req.session.auth));  
    } else {
        res.status(409);
        res.end();
    }
});

app.get('/test', async (req,res) => {
    console.dir(JSON.stringify(req.session));
    res.status(200).json(req.session.auth);
})
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

//----------------- LOGOUT -----------------
app.get('/logout', (req, res) => {
    if (req.session) {
        req.session = null;
        res.status(200);
        res.end(JSON.stringify({ session: 'erased'}));
    }
});
// -----------------------------------------

//--------------- WHOAMI -------------------
app.get("/whoami", async (req, res) => {
    res.end(
      req.session.auth
        ? JSON.stringify(req.session.auth)
        : JSON.stringify({ session: "empty" })
    );
    res.status(200);
  });
//------------------------------------------

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});