const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Defining paths for express config
const pDP = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(pDP))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Mustafa Ashfaq'
    })
})

//Help page
app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        name:'Mustafa Ashfaq',
        message: 'Generated Help Message'   
    })
})


//About page
app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Mustafa Ashfaq'
    })
})

//Weather page
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please provide address'
        })
    }
    geocode(req.query.address, (error, data)=>{
        if(error){
            res.send({
            error})
        }else{
            forecast(data.latitude, data.longitude, (error,result)=>{
                if(error){
                    res.send({
                        erro: result.error
                    })
                }else{
                    res.send({
                        forecast: result,
                        location: data.location,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        address: req.query.address
                    })
                }
            })
        }
    })
    
})

// app.get('/products', (req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[{
//         search: req.query.search,
//         rating: req.query.rating
//         }]
//     })
// })

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Mustafa Ashfaq',
        message: 'help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Mustafa Ashfaq',
        message: 'page not found'  
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
