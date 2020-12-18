const Enquete = require("../../database/models/enquete")
const Voto = require("../../database/models/voto")

const votar = async (userData, votoData) => {
  const { enqueteId, opcaoId } = votoData
  const { usuarioId } = userData

  const enquete = await Enquete.findByPk(enqueteId)

  if (!enquete) throw new Error('Enquete não encontrada!')
  if (!enquete.ativo) throw new Error('Enquete encerrada!')

  await Voto.create({
    usuarioId,
    enqueteId,
    opcaoId
  })
}

module.exports = {
  votar
}