const Usuario = require('../../database/models/usuario')
const CryptoJS = require('crypto-js')

const getToken = () => {
  const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  let token = ''
  for (let i = 0; i < 16; i++) token = token + hexValues[Math.floor(200 * Math.random() % 16)]
  return token
}

const criarUsuario = async (req) => {
  const { nome, login, senha } = req.body
  const token = getToken()
  const senhaDB = CryptoJS.AES.encrypt(token, senha)

  await Usuario.create({
    nome,
    login,
    senha: senhaDB.toString(),
    token
  })
}

const logar = async (req) => {
  const { login, senha } = req.body

  const userDB = await Usuario.findOne({
    where: { login }
  })

  if (!userDB) throw new Error('Usuario/Senha inválidos!')

  const { token, senha: senhaBanco } = userDB
  const decrypted = CryptoJS.AES.decrypt(senhaBanco, senha)
  const tokenDescrypted = decrypted.toString(CryptoJS.enc.Utf8)

  if (tokenDescrypted !== token) throw new Error('Usuario/Senha inválidos!')

  return userDB
}

module.exports = {
  criarUsuario,
  logar
}
