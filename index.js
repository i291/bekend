const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
//midlever za slanje staticke stranice na server
//build mapa mi sadrzi taj staticki sadrzaj
app.use(express.static('build'))
//model Poruka
const Poruka=require('./models/poruke')
const { response } = require('express')

const novaporuka = new Poruka({
    ime:'mongoose ime',
    prezime: 'mongooseprezime',
    email : 'mongoose prezime'

})




	//normalni middlever prima 3 parametra
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
    Poruka.find({}).then(svePoruke => {
        res.json(svePoruke)
    })

})
app.get('/api/poruke/:id',(req,res,next) => {
    //za bazu
    const id=req.params.id
    Poruka.findById(id)
    .then(poruka => {
        //ako je ispravan format id-a
        if(poruka){
            res.json(poruka)
        }
        else{
            //da ne izbaci null jer podatak s tim idem koji se rzalikuje u zadnjoj znamenci postoji ali je null

            res.status(404).end()
        }
    })
    //ako opce nie ispravan format id-a
    //u cijeloj app trazi onaj middlever sa 4 argumenta,skace na onu dole errorhendler funkciju

    .catch(err => next(err))




    // const id=Number(req.params.id) 
    // const poruka = poruke.find(p => p.id === id)
    // if(poruka){
    //     res.json(poruka)


    // }
    // else{
    //     res.status(404).end()
    // }

    


})
app.delete('/api/poruke/:id',(req,res) => {
    const id=req.params.id
    Poruka.findByIdAndRemove(id)
    .then(result =>{
        res.status(204).end()
    })
    .catch(err => next(err))
   

})

app.post('/api/poruke' ,(req,res,next)=> {
    // const maxid = poruke.length > 0 
    // ? Math.max(...poruke.map(p => p.id))
    // : 0

    //podatak kojeg upisujemo na frontendu
    const podatak=req.body
    // if(!podatak.ime || !podatak.prezime || !podatak.email){
    //     return res.status(400),json({
    //         error:'nedostaje sadrzaj'
    //     })
    // }
    const poruka = new Poruka({
        ime:podatak.ime,
        prezime:podatak.prezime,
        email:podatak.email
    })
    // poruka.id=maxid+1

    // poruke=poruke.concat(poruka)
    // res.json(poruka)

    //logika rada s  bazom
    poruka.save().then(result => {
        console.log("podatak spremljen");
        res.json(result)
    })
    .catch(err => next(err))

})
app.put('/api/poruke/:id',(req,res,next) => {
    const id=req.params.id
    const podatak= req.body
    // podatak.id=Number(req.params.id)
    // poruke=poruke.map(p => p.id !== id ? p : podatak)
    // res.json(podatak)
    // res.status(204).end()

    //baza

    const poruka= {
        ime:podatak.ime,
        prezime:podatak.prezime,
        email:podatak.email
    }

    Poruka.findByIdAndUpdate(id,poruka,{new: true}).then(poruka => {
        res.json(poruka)
    })
    .catch(err => next(err))

   

})

const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'nepostojeca ruta' })
  }
   
  app.use(nepoznataRuta)


  //error hendler middlewear funkcije,primaju 4 argumenta, a ne 3 kao klasicni middlveri
const errorHandler = (err,req,res,next) =>{
      console.log("middleweare za pogreske")
      if(err.name= "CastError"){
          return res.status(400).send({error:"krivi fformat id parametra"})

      }else if (err.name === "MongoParseError"){
        return res.status(400).send({error:"krivi format podatka"})

      }
      next(err)
  }
  

app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server slusa port 3003")
})
