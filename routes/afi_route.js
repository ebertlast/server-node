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

    const callbackFunction = function (afiliado, error) {
      if (error) {
        res.status(404).send(error);
      } else {
        res.send(afiliado);
      }
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
      afi_model.create(body, (afiliado) => {
        res.status(200).send({ status: 'ok', afiliado });
      })
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

    if (errores.length > 0) {
      res.status(400).send({ status: 'ko', errores });
    } else {
      afi_model.update(id, body, (afiliado, error) => {
        if (error) {
          errores.push(error);
          res.status(400).send({ status: 'ko', errores });
        } else {
          res.status(200).send({ status: 'ok', afiliado });
        }
      })
    }


  })

  // Delete
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const errores = [];

    afi_model.delete(id, (afiliado, error) => {
      if (error) {
        errores.push(error);
      }
      if (errores.length > 0) {
        res.status(400).send({ status: 'ko', errores });
      } else {
        res.status(200).send({ status: 'ok', afiliado });
      }
    })
  })

  app.use('/afi', router);
}