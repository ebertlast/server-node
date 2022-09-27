const genid = require('uid');
const sql = require('mssql');

const afiliados = [
  { id: 'a6a12312580', nombre: 'Juan', apellido: 'Perez', docidafiliado: '1234', docidtipo: 'DNI' },
  { id: '6a123125805', nombre: 'Maria', apellido: 'Gomez', docidafiliado: '5678', docidtipo: 'DNI' },
  { id: 'a1231258053', nombre: 'Pedro', apellido: 'Gonzalez', docidafiliado: '9087', docidtipo: 'DNI' },
  { id: '12312580538', nombre: 'Jose', apellido: 'Perez', docidafiliado: 'ui47y5324', docidtipo: 'DNI' },
  { id: '23125805385', nombre: 'Maria', apellido: 'Gonzalez', docidafiliado: '0000', docidtipo: 'DNI' },
  { id: '31258053857', nombre: 'Pedro', apellido: 'Gomez', docidafiliado: '87654321', docidtipo: 'DNI' },
  { id: '1258053857d', nombre: 'Jose', apellido: 'Perez', docidafiliado: '12345678', docidtipo: 'DNI' },
  { id: '258053857d4', nombre: 'Maria', apellido: 'Gonzalez', docidafiliado: '654232', docidtipo: 'DNI' },
  { id: '58053857d47', nombre: 'Pedro', apellido: 'Gomez', docidafiliado: '7576172', docidtipo: 'DNI' },
  { id: '8053857d47f', nombre: 'Jose', apellido: 'Perez', docidafiliado: '09218375', docidtipo: 'DNI' },
]


exports.listado = (docidafiliado, callback) => {
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

  sql.connect(sqlConfig)
    .then(pool => {
      let sqlString = `
        SELECT TOP 100 IDAFILIADO,PAPELLIDO,SAPELLIDO,PNOMBRE,SNOMBRE,SEXO,TIPO_DOC, DOCIDAFILIADO 
        FROM AFI
        WHERE '${docidafiliado || ''}' = '' OR DOCIDAFILIADO LIKE '%${docidafiliado}%'
        `;
      
      sqlString = `
        SELECT TOP 100 IDAFILIADO,PAPELLIDO,SAPELLIDO,PNOMBRE,SNOMBRE,SEXO,TIPO_DOC, DOCIDAFILIADO 
        FROM  AFI
        WHERE COALESCE(@DOCIDAFILIADO, '') = '' 
        OR    DOCIDAFILIADO LIKE '%'+@DOCIDAFILIADO+'%'
        `;

      pool
        .request()
        .input('DOCIDAFILIADO', docidafiliado)
        .query(sqlString)
        .then(result => {
          callback(result, null);
        }).catch(err => {
          callback(null, err);
        });

    }).catch(err => {
      console.log(err);
      callback(null, err);
    });
}

exports.afiliado = (id, callback) => {
  const afi = afiliados.find(afi => {
    return afi.id === id
  })
  if (!afi) {
    return callback(null, { error: 'El afiliado con id ' + id + ' no existe' });
  }
  callback(afi);
}

exports.create = (body, callback) => {
  const afiliado = {
    id: genid.uid(),
    docidafiliado: body.docidafiliado,
    docidtipo: body.docidtipo,
    nombre: body.nombre,
    apellido: body.apellido
  };
  afiliados.push(afiliado);
  callback(afiliado);
}

exports.update = (id, body, callback) => {
  const afi = afiliados.find(afi => {
    return afi.id === id
  })
  if (!afi) {
    return callback(null, 'El afiliado con id ' + id + ' no existe');
  }
  afi.docidafiliado = body.docidafiliado;
  afi.docidtipo = body.docidtipo;
  afi.nombre = body.nombre;
  afi.apellido = body.apellido;
  callback(afi);
}

exports.delete = (id, callback) => {
  let afiliado = afiliados.find(afi => afi.id === id);
  if (!afiliado) {
    return callback(null, 'El afiliado con id ' + id + ' no existe');
  }
  afiliados.splice(afiliados.indexOf(afiliado), 1);
  callback(afiliado);
}
