const Enquete = require('../../database/models/enquete')
const Voto = require('../../database/models/voto')

const votar = async (req) => {
  const { enqueteId, opcaoId } = req.body
  const { id: usuarioId } = req.context.userData

  const enquete = await Enquete.findByPk(enqueteId)

  if (!enquete) throw new Error('Enquete não encontrada!')
  if (!enquete.ativo) throw new Error('Enquete encerrada!')

  Voto.removeAttribute('id')
  await Voto.create({
    usuarioId,
    enqueteId,
    opcaoId
  })
}

module.exports = {
  votar
}
