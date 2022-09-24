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
  if (docidafiliado) {
    const afi = afiliados.filter(afi => {
      return afi.docidafiliado === docidafiliado
    })
    callback(afi);
  } else {
    callback(afiliados);
  }
}

exports.afiliado = (id, callback) => {
  const afi = afiliados.find(afi => {
    return afi.id === id
  })
  callback(afi);
}