const mysql = require('mysql2')

const my_pool = mysql.createPool({
  host: 'localhost',
  user: 'dbuser',
  password: 'instrument-pwd',
  database: 'instrument_db'
})

module.exports=my_pool.promise();