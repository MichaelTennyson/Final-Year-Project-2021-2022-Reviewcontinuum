const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const app = express();

app.use(express.json);
app.use(cors());

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "password",
    database: "loginsystem",
});

app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.post('/register', (req, res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;


    db.query(
        "INSER INTO users (Username, Password) VALUES (?,?)", 
        [Username, Password], 
        (err, result)=> {
            console.log(err); 
        
        }
    );
});

app.post('/login', (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    db.query(
        "SELECT * FROM users WHERE Username = ? AND Password = ?", 
        [Username, Password], 
        (err, result)=> {
            if(err){
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send(result); 
            }else{
                res.send({message: "Invalid username or password"});
            }
            
        
        }
    );
});

app.listen(3001, () =>{
    console.log("running on port 3001");
});