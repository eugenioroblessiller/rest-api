const { check } = require('express-validator')
const { uploadFile, updateFile, showImage } = require('../../controllers/uploads')
const { validateCollectionsAllow } = require('../../helpers/dbValidators')
const validateFields = require('../../middlewares/userValidator')
const { validateIfFile } = require('../../middlewares/validateIfFile')


const router = require('express').Router()

router.get('/:collection/:id', [
    check('id', 'Id must be a Mongo id').isMongoId(),
    check('collection').custom(c => validateCollectionsAllow(c, ['users', 'products'])),
    validateFields
], showImage)

router.post('/', [
    validateIfFile,
    validateFields
], uploadFile)

router.put('/:collection/:id', [
    validateIfFile,
    check('id', 'Id must be a Mongo id').isMongoId(),
    check('collection').custom(c => validateCollectionsAllow(c, ['users', 'products'])),
    validateFields
], updateFile)

// router.delete('/:collection/:id', deleteFile)

module.exports = router