const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users'); // Certifique-se de que o caminho para o controlador está correto

router.get('/', UserController.list);
router.post('/user', UserController.create);    
router.get('/:userId', UserController.get);
router.put('/:userId', UserController.update);
router.delete('/:userId', UserController.delete);

module.exports = router;
