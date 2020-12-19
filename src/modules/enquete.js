const sequelize = require('../../database/index')
const Enquete = require('../../database/models/enquete')
const Opcao = require('../../database/models/opcao')
const Voto = require('../../database/models/voto')

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

  await Enquete.update({
    ativo: false
  }, {
    where: {
      id: enqueteId
    }
  })

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

  return opcaoMap
}

const listarEnquete = async (userData) => {
  const { administrador } = userData

  const params = {}

  if (!administrador) params.ativo = true

  return await Enquete.findAll({
    where: params
  })
}

const listaOpcoes = async (enqueteData) => {
  const { enqueteId } = enqueteData
  return await Opcao.findAll({
    where: {
      enqueteId
    }
  })
}

module.exports = {
  criarEnquete,
  encerrarEnquete,
  listarEnquete,
  listaOpcoes
}
