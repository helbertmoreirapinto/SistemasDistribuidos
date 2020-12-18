const express = require('express');
const app = express();
const middleware = require('./src/middleware/middleware')
const port = 3333;

require('./database/index');

app.use(express.json())
app.use(middleware)


const usuario = require('./src/modules/usuario')
const voto = require('./src/modules/voto')
const enquete = require('./src/modules/enquete')

app.post("/criarUsuario", async (req, res) => {
  try {

    const user = await usuario.criarUsuario(req.body)
    res.status(200).send(user)

  } catch (error) {
    res.status(400).send(error.message)
  }

})

app.get("/logar", async (req, res) => {

  try {

    const user = await usuario.logar(req.body)
    res.status(200).send(user)

  } catch (error) {
    res.status(400).send(error.message)
  }

})

app.post("/criarEnquete", async (req, res) => {
  try {
    const enq = await enquete.criarEnquete(req.body)
    res.status(200).send(enq)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get("/listarEnquete", async (req, res) => {
  try {
    const enqueteList = await enquete.listarEnquete()
    res.status(200).send(enqueteList)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get("/listarOpcoes", async (req, res) => {
  try {
    const opcaoList = await enquete.listaOpcoes(req.body)
    res.status(200).send(opcaoList)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post("/votar", async (req, res) => {
  try {
    await voto.votar(req.body, req.body)
    res.status(200).send("voto computado")
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post("/encerrarEnquete", async (req, res) => {
  try {
    const resultado = await enquete.encerrarEnquete(req.body)
    res.status(200).send(resultado)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(port, function () {
  console.log(`Servidor em execução na porta: ${port}`)
});