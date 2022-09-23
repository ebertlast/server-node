const genid = require('uid');

module.exports = app => {
  var router = require("express").Router();

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

  // Read
  router.get('/:docidafiliado?', (req, res) => {
    const docidafiliado = req.params.docidafiliado;
    if (!docidafiliado) {
      res.send(afiliados);
    } else {
      // const afiliado = afiliados.find(afi => afi.docidafiliado === docidafiliado);
      const afi = afiliados.filter(afi => {
        return afi.docidafiliado === docidafiliado
      })
      console.log("🚀 ~ file: afi_route.js ~ line 24 ~ router.get ~ afi", afi)
      res.send(afi);
    }
  })

  // Read
  router.get('/:id/id', (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.send(afiliados);
    } else {
      const afi = afiliados.filter(afi => {
        return afi.id === id
      })
      res.send(afi);
    }
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