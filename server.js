const express = require('express')
const dotenv = require('dotenv') 
const app = express()
dotenv.config()
const PORT = process.env.PORT
let coffees = require('./models/coffee.js')


//Middleware
app.use(express.urlencoded({extended: true}))

//lets controllers know how to look in view folder to ejs files
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send(`What's up doc?`)
})

app.get('/coffees', (req, res) => {
    res.render('coffee_index.ejs', {
       allCoffees: coffees
    })
})


app.get('/coffees/new', (req, res) => {
    res.render("newdrink.ejs")
})


app.get('/coffees/:index', (req, res) => {
    res.render('coffee_show.ejs', {
        drink: coffees[req.params.index],
        index: req.params.index
    })
})

app.post('/coffees', (req, res) => {
    req.body.price = parseInt(req.body.price)
    if (req.body.hasCream === "on"){
        req.body.hasCream = true;
    } else {
        req.body.hasCream = false
    }
    coffees.push(req.body)
    console.log(req.body)
    res.redirect('/coffees')
})


app.listen(PORT, () => {
    console.log(`Can you feel the ${PORT} tonightttt?`)
}) 