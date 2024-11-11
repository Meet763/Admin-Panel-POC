const express = require('express')
const upload = require('../middleware/multer.middleware')
const {createEmployee, editEmployee, employeeList, deleteEmployee} = require('../controller/employeeController/adminController')
const router = express.Router();
const {jwtAuthMiddleware} = require('../middleware/auth')

router.get('/', jwtAuthMiddleware, employeeList)

router.delete('/delete/:id', jwtAuthMiddleware, deleteEmployee)


router.post('/create', jwtAuthMiddleware, upload.single('imageUrl'), createEmployee)

router.put('/edit/:id', jwtAuthMiddleware, upload.single('imageUrl'), editEmployee)




module.exports = router