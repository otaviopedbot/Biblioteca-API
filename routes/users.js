const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkToken = require('../middlewares/checkToken')

// Rotas para autenticação
router.post('/login', UserController.login);
router.post('/register', UserController.createUser);

// Rotas para operações do usuário
router.route('/:id')
    .get(checkToken, UserController.showUser)
    .put(checkToken, UserController.editUser)
    .delete(checkToken, UserController.deleteUser);

// Rotas para favoritos do usuário
router.route('/:id/favorites')
    .post(UserController.createFavorite)
    .get(UserController.showUserFavorites);

router.route('/:id/favorites/:favoriteId')
    .put(UserController.editFavorite)
    .delete(UserController.deleteFavorite);

// Rota para buscar usuário por nome de usuário
router.get('/search/:username', UserController.showUserByUsername);

router.get('/', checkToken, UserController.index);

module.exports = router;