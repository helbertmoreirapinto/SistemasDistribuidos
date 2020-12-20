const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./src/middleware/middleware')

require('./database/index')

app.use(cors())
app.use(express.json())
app.use(middleware)

const usuario = require('./src/modules/usuario')
const voto = require('./src/modules/voto')
const enquete = require('./src/modules/enquete')

app.get('/criarUsuario/:nome/:login/:pass', async (req, res) => {
  try {
    const { nome, login, pass: senha } = req.params
    const user = await usuario.criarUsuario(nome, login, senha)
    return res.status(200).send(user)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.post('/logar', async (req, res) => {
  try {
    const user = await usuario.logar(req)
    return res.status(200).send(user)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.post('/criarEnquete', async (req, res) => {
  try {
    const enq = await enquete.criarEnquete(req)
    return res.status(200).send(enq)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.get('/listarEnquete', async (req, res) => {
  try {
    const enqueteList = await enquete.listarEnquete(req)
    return res.status(200).send(enqueteList)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.get('/listarOpcoes/:enqueteId', async (req, res) => {
  try {
    const { enqueteId } = req.params
    const opcaoList = await enquete.listaOpcoes(enqueteId)
    return res.status(200).send(opcaoList)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.post('/votar', async (req, res) => {
  try {
    await voto.votar(req)
    return res.status(200).send('Voto computado!')
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.post('/encerrarEnquete', async (req, res) => {
  try {
    await enquete.encerrarEnquete(req)
    return res.status(200).send()
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.get('/resultadoEnquete/:enqueteId', async (req, res) => {
  try {
    const { enqueteId } = req.params
    const resultado = await enquete.resultadoEnquete(enqueteId)
    return res.status(200).send(resultado)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

app.listen(process.env.PORT || 3333)
