const sequelize = require('../../database/index')
const Enquete = require("../../database/models/enquete")
const Opcao = require("../../database/models/opcao")

const criarEnquete = async (enqueteData) => {
  const { titulo, optionValues = [] } = enqueteData

  return await sequelize.transaction(async tr => {

    const enquete = await Enquete.create({
      titulo
    }, { transaction: tr })

    const enqueteId = enquete.id

    const options = []
    optionValues.forEach(option => {
      option.enqueteId = enqueteId
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

  // fazer um select na tabela voto com join em opcoes por id da enquete e retornar resultado da enquete
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