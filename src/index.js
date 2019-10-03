const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql      = require('mysql');

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const viewsPath = path.join(__dirname, "/views");

app.set('view engine', 'ejs')
app.set("views", viewsPath)

app.use('/public',express.static(path.join(__dirname, "../public")));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'opdemy'
  });
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('Connection Established');
  });  

app.get('/', (req,res) =>{
    
    var sql = 'SELECT * FROM user_detail';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
            const data = results[1];
            res.render('dashboard',{data:data});
        }    
    });
});

app.get('/editprofile/:user_id', (req,res) =>{
  var sql = 'SELECT * FROM user_detail WHERE user_id = ?';
  connection.query(sql,[req.params.user_id], function (error, results, fields) {
      if (error){
          throw error;
      }else{
        res.render('updateprofile',{info:results});
      }    
  });
});

app.post('/editprofile', (req,res) =>{
  let {first_name,last_name,user_name,email_id,contact_no,paasword,user_id} = req.body;
  var sql = 'UPDATE user_detail SET first_name = ?, last_name = ?, user_name = ?, email_id = ?, contact_no = ?, paasword = ? WHERE user_id = ?';
  connection.query(sql,[first_name,last_name,user_name,email_id,contact_no,paasword,user_id], function (error, results, fields) {
      if (error){
          throw error;
      }else{
        res.redirect('/');
      }    
  });
});

const server = app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
  });