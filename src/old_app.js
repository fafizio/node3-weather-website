const path=require('path') //core module non lo installo
const express=require('express') //npm modulo, lo installo con npm install..

// app.com          -> main
// app.com/help     -> root
// app.com/about    -> root


// console.log(__dirname) -> __dirname mi da il path della directory dove sta questo file
// console.log(path.join(__dirname, '../public')) -> sto creando il mio path unendo i comandi

const app=express()

const publicDirectoryPath=path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath)) //static directory per pagine statiche, mi crea tutti i puntamenti in funzione di quello che c'è nel public senza usare app.get per caricare la singola pagina

/*app.get() -> cosa il server deve fare quando richiediamo un url.
due argomenti, il rooting, e una funzione di callback (la richiesta e la risposta).
req è un oggetto che contiene informazioni sull'incoming request al server 
res contiene metodi per customizzare la risposta*/

// app.get('/help', (req, res)=>{ 
//     /*primo argomento è il root, il secondo è la callback ovvero cosa vogliamo che faccia quando uno visita questa root
//     tipo leggere dati dal database o creare HTML o rimandare dei JSON di dati*/

//     res.send([{ //res.send manda dati indietro al request
//         name:'Fabrizio',
//         age:27
//     }, {
//         name: 'Sara',
//         age:25
//     }])//rispondiamo con un array contenente oggetti di dati che vengono trasformati in automatico in JSON

// })

// app.get('/about', (req,res)=>{
//     res.send('<h1>About page</h1>')
// })

app.get('/weather',(req,res)=>{
    res.send({
        forecast: 'Sta piovendo',
        location: 'Philadelphia'
    })
})

//startiamo il server, un metodo che va usato una sola volta nell'app
app.listen(5000, ()=>{
    //call back funzione
    console.log('Server is up on port 5000')
})