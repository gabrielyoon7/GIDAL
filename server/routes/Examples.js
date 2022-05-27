const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Example } = require('../models/Example');


// First route helps us quickly seed the database
router.get('/seed', async (req, res) => {
    console.log('hihi');
    try {
        const todos = await Example.create([
            { title: 'Todo A', description: 'whatever' },
            { title: 'Todo B', description: 'whatever' },
            { title: 'Todo C', description: 'whatever' },
            { title: 'Todo D', description: 'whatever' },
            { title: 'Todo E', description: 'whatever' },
            { title: 'Todo F', description: 'whatever' },
            { title: 'Todo G', description: 'whatever' },
            { title: 'Todo H', description: 'whatever' },
            { title: 'Todo I', description: 'whatever' },
            { title: 'Todo J', description: 'whatever' },
            { title: 'Todo K', description: 'whatever' },
            { title: 'Todo L', description: 'whatever' },
            { title: 'Todo M', description: 'whatever' },
            { title: 'Todo N', description: 'whatever' },
            { title: 'Todo O', description: 'whatever' },
            { title: 'Todo P', description: 'whatever' },
            { title: 'Todo Q', description: 'whatever' },
            { title: 'Todo R', description: 'whatever' },
            { title: 'Todo S', description: 'whatever' },
            { title: 'Todo T', description: 'whatever' },
            { title: 'Todo U', description: 'whatever' },
            { title: 'Todo V', description: 'whatever' },
            { title: 'Todo W', description: 'whatever' },
            { title: 'Todo X', description: 'whatever' },
            { title: 'Todo Y', description: 'whatever' },
            { title: 'Todo Z', description: 'whatever' }
        ])

        res.status(201).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// This route is the one we will be dealing the most with. It accepts a "skip" query
// param which is then passed in as an option in our mongoose query. I've also set the
// limit to 5, otherwise we will get all the todos at once
router.get('/todos', async (req, res) => {
    console.log('hehe');
    try {
        const skip =
            req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0

        const todos = await Example.find({}, undefined, { skip, limit: 5 }).sort('title')

        res.send(todos)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router;