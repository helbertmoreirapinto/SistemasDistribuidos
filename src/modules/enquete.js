const sequelize = require('../../database/index')
const Enquete = require("../../database/models/enquete")
const Opcao = require("../../database/models/opcao")
const Voto = require('../../database/models/voto')

const criarEnquete = async (enqueteData) => {
  const { titulo, optionValues = [] } = enqueteData

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

const encerrarEnquete = async (enqueteData) => {
  const { enqueteId } = enqueteData

  await Enquete.update({
    ativo: false
  }, {
    where: {
      id: enqueteId
    }
  })

  const votoList = await Voto.findAll({
    where: {
      enqueteId
    }
  })

  console.log(votoList)
  // fazer um select na tabela voto com join em opcoes por id da enquete e retornar resultado da enquete

  return null
}

const listarEnquete = async () => {
  return await Enquete.findAll({
    where: {
      ativo: true
    }
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