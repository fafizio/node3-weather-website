
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port=process.env.PORT || 5000 //la porta viene definita da Heroku, altrimenti è 5000 per funzionare in localhost

// Defined paths for Express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Fabrizio Riva'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About me',
        name:'Fabrizio Riva'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name:'Fabrizio Riva',
        helpText:'Messaggio di aiuto'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'Un indirizzo deve essere inserito'
        })
    } //con return posso evitare else. 1 richiesta http vuole 1 solo res.send che lavori

    geocode (req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast (latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name:'Fabrizio Riva',
        errorMessage:'Help articol not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        name:'Fabrizio Riva',
        errorMessage:'My404 Error'
    })
})


// avvia il server
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})