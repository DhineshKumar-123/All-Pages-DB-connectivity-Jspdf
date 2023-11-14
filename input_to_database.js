const express = require('express');
const mysql = require('mysql');
const cors=require('cors')

const app = express();
const port = 3100;

app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'updated_db'
});

app.use(express.json());

// app.post('/data', (req, res) => {
//   const { id,name, email, message } = req.body;

//   const sql = 'INSERT INTO mytable (id,name, email, message) VALUES (?,?, ?, ?)';
//   const values = [id, name, email, message];

//   connection.query(sql, values, (err, result) => {
//     if (err) throw err;

//     res.send('Data saved to database');
//   });
// });

app.get('/data/:report_id', (req, res) => {
  const report_id = req.params.report_id;
  const sql =  `SELECT * FROM data_management_workshop where report_id=?`;
  

  connection.query(sql,[report_id], (err, results) => {
    if (err) throw err;

    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});