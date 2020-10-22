const express = require('express')

const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
//midlever za slanje staticke stranice na server
//build mapa mi sadrzi taj staticki sadrzaj
app.use(express.static('build'))
	
const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
  }
   
  app.use(zahtjevInfo)
 let   poruke = [
      {
        id: 1,
        ime: "Ivana",
        prezime: "Radalj",
        email: "ivanaradalj1234@gmail.com"
      },
      {
        id: 2,
        ime: "Antonela",
        prezime: "Dragicevic",
        email: "adragicevic@gmail.com"
      },
      {
        ime: "ana",
        prezime: "matijasevic",
        email: "ana@gmail.com",
        id: 5
      }
]
app.get('/',(req,res) => {
    res.send('<h1>pozzz od expres servera</h1>')

})
app.get('/api/poruke',(req,res) => {
    res.json(poruke)

})
app.get('/api/poruke/:id',(req,res) => {
    const id=Number(req.params.id) 
    const poruka = poruke.find(p => p.id === id)
    if(poruka){
        res.json(poruka)


    }
    else{
        res.status(404).end()
    }

})
app.delete('/api/poruke/:id',(req,res) => {
    const id=Number(req.params.id) 
    poruke=poruke.filter(p => p.id !== id)
    res.status(204).end()
   

})

app.post('/api/poruke' ,(req,res)=> {
    const maxid = poruke.length > 0 
    ? Math.max(...poruke.map(p => p.id))
    : 0


    const podatak=req.body
    if(!podatak.ime || !podatak.prezime || !podatak.email){
        return res.status(400),json({
            error:'nedostaje sadrzaj'
        })
    }
    const poruka = {
        ime:podatak.ime,
        prezime:podatak.prezime,
        email:podatak.email
    }
    poruka.id=maxid+1

    poruke=poruke.concat(poruka)
    res.json(poruka)
})
app.put('/api/poruke/:id',(req,res) => {
    const id=Number(req.params.id) 
    const podatak= req.body
    podatak.id=Number(req.params.id)
    poruke=poruke.map(p => p.id !== id ? p : podatak)
    res.json(podatak)
    res.status(204).end()

   

})

const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'nepostojeca ruta' })
  }
   
  app.use(nepoznataRuta)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log("server slusa port 3003")
})
