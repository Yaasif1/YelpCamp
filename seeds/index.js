const {places, descriptors} = require('./seedHelpers')
const cities = require('./cities')
const mongoose = require('mongoose');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',)
    .then(() => {
        console.log("MONGO Connection working")
    })
    .catch((err) => {
        console.log("on no MONGO CONNECTION NO WORKING!!")
        console.log(err)
    })

const seedDB = async() => {
    await Campground.deleteMany({});
    for( let i = 0; i < 51; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const random21 = Math.floor(Math.random()*21);
        const camp = new Campground({
            title: `${descriptors[random21]} ${places[random21]}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close()
})