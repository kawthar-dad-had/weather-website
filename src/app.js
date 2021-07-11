const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//define paths fot express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname , '../templates/views')
const partialspath = path.join(__dirname , '../templates/partials')

//setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewspath)
hbs.registerPartials(partialspath)


//setup a static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) => {
    res.render('index', {
        title: 'weather App',
        name: 'kawthar'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title: 'ABOUT',
        name: 'kawthar'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title: 'help page',
        help_message: 'how can i help you!',
        name: 'kawthar'
    })
}) 

app.get('/weather' , (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address , (error, {latitude , longitude , location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products' , (req,res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})



//app.com
//app.com/help
//app.com/about



// port 3000
app.listen(3000, () => {
    console.log('server is up on port 3000')
}) 