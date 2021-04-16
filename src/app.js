const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const rootDir = __dirname;
const publicDirectoryPath = path.join(rootDir,'../public')
const viewsPath = path.join(rootDir, '../templates/views')
const partialspath = path.join(rootDir,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Karan Ajmani'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Karan Ajmani'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help",
        name: "Karan Ajmani",
        helpMessage: "Hey! I'm help message."
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send('Error', error)
            }
            // res.send(location)
            // res.send(forecastdata)
            res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
            })
        })
    })
    // console.log(req.query)
    // res.send({
    //     forecast: "30 degrees",
    //     location: "Indore",
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Karan Ajmani",
        errorMessage: "Help Article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Karan Ajmani",
        errorMessage: "Page not found."
    })
})

// app.com
// app.com/help 
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})