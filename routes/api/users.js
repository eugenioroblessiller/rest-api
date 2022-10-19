const router = require('express').Router()


router.get('/users', (req, res) => {
    // router code here
    res.status(200).json({ message: 'get users' })
})


router.get('/users/:id', (req, res) => {
    res.status(200).json({ message: 'get user', id: req.params.id })
})

router.post('/users', (req, res) => {
    res.status(200).json({ message: 'post users' })
})

router.put('/users/:id', (req, res) => {
    res.status(200).json({ message: 'put users' })
})

router.delete('/users/:id', (req, res) => {
    res.status(200).json({ message: 'delete users' })
})



module.exports = router