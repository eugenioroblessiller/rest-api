const router = require('express').Router()


router.get('/', (req, res) => {
    // router code here
    res.status(200).json({ message: 'get users' })
})


router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'get user', id: req.params.id })
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'post users' })
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'put users' })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'delete users' })
})



module.exports = router