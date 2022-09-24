const genid = require('uid');
const afi_model = require('../models/afi_model');

module.exports = app => {
  var router = require("express").Router();

  // Read
  router.get('/:docidafiliado?', (req, res) => {
    const docidafiliado = req.params.docidafiliado;

    afi_model.listado(docidafiliado, (afiliados) => {
      res.send(afiliados);
    })
    
  })

  // Read
  router.get('/:id/id', (req, res) => {
    const id = req.params.id;

    const callbackFunction = function (afiliado) {
      res.send(afiliado);
    }

    afi_model.afiliado(id, callbackFunction);
  })

  // Create
  router.post('/', (req, res) => {
    const body = req.body;
    const errores = [];
    if (!body.docidafiliado) {
      errores.push('El campo docidafiliado es obligatorio');
    }
    if (!body.docidtipo) {
      errores.push('El campo docidtipo es obligatorio');
    }
    if (!body.nombre) {
      errores.push('El campo nombre es obligatorio');
    }
    if (!body.apellido) {
      errores.push('El campo apellido es obligatorio');
    }
    if (errores.length > 0) {
      res.status(400).send({ status: 'ko', errores });
    } else {
      const afiliado = {
        id: genid.uid(),
        docidafiliado: body.docidafiliado,
        docidtipo: body.docidtipo,
        nombre: body.nombre,
        apellido: body.apellido
      }
      afiliados.push(afiliado);
      res.status(200).send({ status: 'ok', afiliado });
    }
  })

  // Update
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const errores = [];

    if (!body.docidafiliado) {
      errores.push('El campo docidafiliado es obligatorio');
    }
    if (!body.docidtipo) {
      errores.push('El campo docidtipo es obligatorio');
    }
    if (!body.nombre) {
      errores.push('El campo nombre es obligatorio');
    }
    if (!body.apellido) {
      errores.push('El campo apellido es obligatorio');
    }

    let afiliado = afiliados.find(afi => afi.id === id);

    if (!afiliado) {
      errores.push('El afiliado con id ' + id + ' no existe');
    }
    if (errores.length > 0) {
      res.status(400).send({ status: 'ko', errores });
    } else {
      afiliado.docidafiliado = body.docidafiliado;
      afiliado.docidtipo = body.docidtipo;
      afiliado.nombre = body.nombre;
      afiliado.apellido = body.apellido;
      res.status(200).send({ status: 'ok', afiliado });
    }


  })

  // Delete
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const errores = [];
    let afiliado = afiliados.find(afi => afi.id === id);
    if (!afiliado) {
      errores.push('El afiliado con id ' + id + ' no existe');
    }
    if (errores.length > 0) {
      res.status(400).send({ status: 'ko', errores });
    } else {
      afiliados.splice(afiliados.indexOf(afiliado), 1);
      res.status(200).send({ status: 'ok', afiliado });
    }
  })

  app.use('/afi', router);
}