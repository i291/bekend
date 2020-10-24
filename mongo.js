const mongoose= require('mongoose')
const password = 'cvitrasteutravi123'
const dbname= 'porukeapi'

const url=`mongodb+srv://ivanaradalj-okviri:${password}@cluster0.vqn5c.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

//shema
  const porukaSchema = new mongoose.Schema({
      ime:String,
      prezime: String,
      email:String


  })

  //model
  //kkao zovemo model i govorimo prema kojoj shemi radimo model to su dva parametra

  const Poruka = mongoose.model('Poruka',porukaSchema, 'poruke')


  const novaporuka = new Poruka({
      ime:'ana',
      prezime: 'radalj',
      email : 'aradalj@gmail.com'

  })
//callbek funkicija da nade sve,dphvat podataka nakon sta smoo ih spremili na mongoose
//find vraca niz!
Poruka.find({})
.then(result =>{
    result.forEach( p =>{
        console.log(p);
  })
  mongoose.connection.close()
})

//    novaporuka.save().then(result=>{
//        console.log("poruka spremljena")
//        console.log(result)
//      mongoose.connection.close()

//  })

