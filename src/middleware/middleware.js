const Usuario = require('../../database/models/usuario')
const USER_ADM_ID = 1

module.exports = async (req, res, next) => {
  const rotaSelecionada = req.originalUrl
  if ((!req.headers || !req.headers.usuarioid) && (['/criarUsuario', '/logar'].find(rota => rota === rotaSelecionada))) {
    return next()
  }

  const usuarioId = req.headers.usuarioid
  const usuario = await Usuario.findByPk(usuarioId)
  if (!usuario || (['/criarEnquete', '/encerrarEnquete', '/resultadoEnquete'].find(rota => rota === rotaSelecionada) && usuario.id !== USER_ADM_ID)) {
    res.status(400).send('Rota inválida para o usuário!')
    return new Error()
  }
  req.context = {}
  req.context.userData = usuario

  return next()
}
