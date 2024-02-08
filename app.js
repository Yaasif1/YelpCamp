const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',)
    .then(() => {
        console.log("MONGO Connection working")
    })
    .catch((err) => {
        console.log("on no MONGO CONNECTION NO WORKING!!")
        console.log(err)
    })
    
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected")
// });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
express.json()


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const allCamps = await Campground.find({})
    res.render('campgrounds/index', {allCamps})
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const campGround = await Campground.findById(id)
    console.log(campGround)
    res.render('campgrounds/show', {campGround})
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My Garden', description: 'cheap camping'})
    await camp.save();
    res.send(camp)
});

app.listen(3000, () => {
    console.log("Serving on port 3000")
});


