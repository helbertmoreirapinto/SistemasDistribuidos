const sequelize = require('../../database/index')
const Enquete = require('../../database/models/enquete')
const Opcao = require('../../database/models/opcao')
const Voto = require('../../database/models/voto')
const ADM_USER_ID = 1

const criarEnquete = async (req) => {
  const { titulo, optionValues = [] } = req.body

  return await sequelize.transaction(async tr => {
    const enquete = await Enquete.create({
      titulo
    }, { transaction: tr })

    const enqueteId = enquete.id

    const options = []
    optionValues.forEach((option, idx) => {
      option.enqueteId = enqueteId
      option.id = idx + 1
      options.push(option)
    })

    await Opcao.bulkCreate(options, { transaction: tr })

    return enquete
  })
}

const encerrarEnquete = async (req) => {
  const { enqueteId } = req.body

  await Enquete.update({ ativo: false }, {
    where: { id: enqueteId }
  })
}

const listarEnquete = async (req) => {
  const { id: usuarioId } = req.context.userData

  const params = {}

  if (usuarioId !== ADM_USER_ID) params.ativo = true

  return await Enquete.findAll({
    where: params
  })
}

const listaOpcoes = async (enqueteId) => {
  return await Opcao.findAll({
    where: {
      enqueteId
    }
  })
}

const resultadoEnquete = async (enqueteId) => {
  Voto.removeAttribute('id')
  const votoList = await Voto.findAll({
    where: {
      enqueteId
    }
  })

  const opcaoList = await Opcao.findAll({
    where: {
      enqueteId
    }
  })

  const opcaoMap = new Map()
  opcaoList.forEach((opcao) => {
    opcaoMap[opcao.id] = {
      text: opcao.mensagem,
      count: 0
    }
  })

  votoList.forEach((voto) => {
    opcaoMap[voto.opcaoId].count = opcaoMap[voto.opcaoId].count + 1
  })

  const returnList = []
  for (const item in opcaoMap) {
    returnList.push(opcaoMap[item])
  }

  return returnList
}

module.exports = {
  criarEnquete,
  encerrarEnquete,
  resultadoEnquete,
  listarEnquete,
  listaOpcoes
}
