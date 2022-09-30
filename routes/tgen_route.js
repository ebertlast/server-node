
const tgen_model = require('../models/tgen_model');
module.exports = app => {
  var router = require("express").Router();

  // Create
  router.post('/', (req, res) => {
    const body = req.body;
    const errores = [];
    if (!body.TABLA) {
      errores.push('El campo TABLA es obligatorio');
    }
    if (!body.CAMPO) {
      errores.push('El campo CAMPO es obligatorio');
    }
    if (!body.CODIGO) {
      errores.push('El campo CODIGO es obligatorio');
    }
    if (errores.length > 0) {
      res.status(400).send({ status: 'ko', errores });
    } else {
      tgen_model.create(body, (data, error) => {
        if (error) {
          res.status(500).send({ status: 'ko', error });
        } else {
          res.status(200).send({ status: 'ok', data });
        }
      })
    }
  })

  // Read
  router.get('/:TABLA/:CAMPO/:CODIGO?', (req, res) => {
    console.log(req.params);
    tgen_model.read(req.params, (data, error) => {
      if (error) {
        res.status(500).send({ status: 'ko', error });
      } else {
        res.status(200).send({ status: 'ok', data });
      }
    })
  })


  app.use('/tgen', router);
}