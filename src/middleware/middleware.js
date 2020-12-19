const Usuario = require('../../database/models/usuario')
const USER_ADM_ID = 1

module.exports = async (req, res, next) => {
  if (req.headers && req.headers.usuarioid) {
    const usuarioId = req.headers.usuarioid
    const usuario = await Usuario.findByPk(usuarioId)
    const rotaSelecionada = req.originalUrl
    if (!usuario || (['/criarEnquete', '/encerrarEnquete'].find(rota => rota === rotaSelecionada) && usuario.id !== USER_ADM_ID)) {
      res.status(400).send('Rota inválida para o usuário!')
      return new Error()
    }
    req.context = {}
    req.context.userData = usuario
  }
  return next()
}
