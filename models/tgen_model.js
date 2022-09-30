
const db = require('../libs/mssql_db');

exports.create = (body, callback) => {
  let sqlString = `
  INSERT INTO TGEN(TABLA,CAMPO,CODIGO,DESCRIPCION,VALOR1,DFECHA,OBSERVACION)
  SELECT @TABLA,@CAMPO,@CODIGO,@DESCRIPCION,@VALOR1,@DFECHA,@OBSERVACION
  WHERE NOT EXISTS(SELECT 1 FROM TGEN WHERE TABLA=@TABLA AND CAMPO=@CAMPO AND CODIGO=@CODIGO)
  `;
  let params = [
    { name: 'TABLA', value: body.TABLA },
    { name: 'CAMPO', value: body.CAMPO },
    { name: 'CODIGO', value: body.CODIGO },
    { name: 'DESCRIPCION', value: body.DESCRIPCION },
    { name: 'VALOR1', value: body.VALOR1 },
    { name: 'DFECHA', value: body.DFECHA || 0 },
    { name: 'OBSERVACION', value: body.OBSERVACION }
  ];
  db.query(sqlString, params, (result, err) => {
    if (err) {
      return callback(null, err);
    }
    callback(result);
  })
}

exports.read = (body, callback) => {
  const sqlString = `
  SELECT TABLA,CAMPO,CODIGO,DESCRIPCION,VALOR1,DFECHA,OBSERVACION
  FROM TGEN
  WHERE TABLA=@TABLA AND CAMPO=@CAMPO AND CODIGO=@CODIGO
  `;
  const params = [
    { name: 'TABLA', value: body.TABLA },
    { name: 'CAMPO', value: body.CAMPO },
    { name: 'CODIGO', value: body.CODIGO }
  ];
  db.query(sqlString, params, (result, err) => {
    if (err) {
      return callback(null, err);
    }
    callback(result);
  })
}