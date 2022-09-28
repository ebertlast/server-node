const sql = require('mssql');

exports.query = async (sqlString, inputs, callback) => {
  const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

  try {
    const pool = new sql.ConnectionPool({ ...sqlConfig });
    var conn = await pool.connect(sqlConfig)
    var request = await conn.request();
    if (inputs && inputs.length > 0) {
      inputs.forEach(el => {
        request.input(el.name, el.value);
      });
      // for (const key in inputs) {
      //   request.input(key, inputs[key]);
      // }
    }
    var result = await request.query(sqlString);
    callback(result, null);
  } catch (err) {
    callback(null, err);
  }

}