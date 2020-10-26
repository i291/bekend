//sve vezano uz bazu ide u mapu models
const mongoose= require('mongoose')
const password = process.env.ATLAS_PASS
const dbname= 'porukeapi'
const url=`mongodb+srv://ivanaradalj-okviri:${password}@cluster0.vqn5c.mongodb.net/${dbname}?retryWrites=true&w=majority`
console.log("spajam se na bazu")
//connect je isto promise,callbek pa ide .then i .catch
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(result => {
    console.log("Spojeni smo na bazu");
  }).catch(error => {
    console.log("Greška pri spajanju", error.message);
  })



  //shema
  //mongo baca validation error kada pokusam spremiti podatak koji ne odgovara validaciji 
  
  const porukaSchema = new mongoose.Schema({
      //validacija sheme
    ime:{
      type: String,
      required: true,
      minlength: 5 
    },
    prezime: {
      type: String,
      required: true,
      minlength: 5 

    },
    email:{
      type: String,
      required: true,
      minlength: 5 

    }


})
//radi nonoga id-a ruznog i onoga _v,overrajdat cemo metodu .tojson
//doc je kako inace vrati,a ret je kako mi zelimo da vrati
porukaSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.id= ret._id.toString()
        delete ret._id //nezelim id dami vrati
        delete ret.__v //nezelim da mi vrati v
        return ret


    }
})


//model kojeg moram exportat
module.exports = mongoose.model('Poruka',porukaSchema, 'poruke')