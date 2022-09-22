module.exports = app => {
  var router = require("express").Router();

  router.get('/saludar/:nombre/:apellido?', (solicitud, respuesta) => {
    var nombre = solicitud.params.nombre;
    var apellido = solicitud.params.apellido || '';

    respuesta.send('Hola ' + nombre + ' ' + apellido);
  })
  
  router.post('/json', (req, res) => {
    const body = req.body;
    res.send(body);
  })
 
  router.post('/json2', (req, res) => {
    const body = req.body;
    res.send(body);
  })

  router.post('/json3', (req, res) => {
    const body = req.body;
    res.send(body);
  })

  app.use('/test2', router);
}