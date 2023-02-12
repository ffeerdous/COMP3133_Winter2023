const express = require("express")
const User = require("../model/userModel.js")
const routes = express.Router()

routes.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

routes.post("/users", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                suite: req.body.address.suite,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode,
                geo: {
                    lat: req.body.address.geo.lat,
                    lng: req.body.address.geo.lng
                }
            },
            phone: req.body.phone,
            website: req.body.website,
            company: {
                name: req.body.company.name,
                catchPhrase: req.body.company.catchPhrase,
                bs: req.body.company.bs
            }
        });
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = routes