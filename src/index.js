const express = require("express");
const path = require('path');
const morgan = require('morgan');
const router = express.Router();
const port = process.env.port || 3000;
const sqlite3 = require("sqlite3").verbose();

const app = express();

let db = new sqlite3.Database('./src/SOA.db',(err)=>{
  if (err) {
      return console.log(err);
  }
  return console.log('Connected');
})

app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}))



app.get("/", (req, res) => {
  res.render('index');
});

app.get("/Getpersona/:id", (req, res) => {

  let sql = 'SELECT * FROM usuarios WHERE apellidoPat = ?';
  db.get(sql,req.params.id,(err,row)=>{
      if(err){
        return  console.log(err);
      }
      return res.send(row);
  });
});

app.listen(port, () => `Server running on port ${port} 🔥`);