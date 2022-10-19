const router = require('express').Router()


router.get('/helloWorld', (req, res) => {
    res.status(403).json({ message: 'get API' })
})


router.put('/helloWorld', (req, res) => {
    res.status(403).json({ message: 'put API' })
})

router.post('/helloWorld', (req, res) => {
    res.status(201).json({ message: 'post API' })
})

router.delete('/helloWorld', (req, res) => {
    res.status(403).json({ message: 'delete API' })
})

module.exports = router