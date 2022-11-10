const { uploadFile } = require('../../controllers/uploads')


const router = require('express').Router()

router.post('/', uploadFile)

module.exports = router