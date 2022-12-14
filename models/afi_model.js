const genid = require('uid');
const sql = require('mssql');
const db = require('../libs/mssql_db');

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
  let sqlString = `
  SELECT TOP 100 IDAFILIADO,PAPELLIDO,SAPELLIDO,PNOMBRE,SNOMBRE,SEXO,TIPO_DOC, DOCIDAFILIADO 
  FROM  AFI
  WHERE COALESCE(@DOCIDAFILIADO, '') = '' 
  OR    DOCIDAFILIADO LIKE '%'+@DOCIDAFILIADO+'%'
  `;
  let params = [
    { name: 'DOCIDAFILIADO', value: docidafiliado }
  ];

  db.query(sqlString, params, (result, err) => {
    if (err) {
      return callback(null, err);
    }
    callback(result);
  })
}

exports.afiliado = (id, callback) => {
  let sqlString = `
  SELECT TOP 1 IDAFILIADO,PAPELLIDO,SAPELLIDO,PNOMBRE,SNOMBRE,SEXO,TIPO_DOC, DOCIDAFILIADO 
  FROM  AFI
  WHERE IDAFILIADO = @IDAFILIADO
  `;

  let callbackfn = (result, err) => {
    if (err) {
      return callback(null, err);
    }
    var afiArr = result.recordset;
    if (afiArr.length <= 0) {
        return callback(null, { error: 'El afiliado con id ' + id + ' no existe' });
    }
    var afi = afiArr[0];
    callback(afi);
  }

  db.query(sqlString, [{ name: 'IDAFILIADO', value: id }], callbackfn)
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
