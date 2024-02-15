const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const FavoriteController = require('../controllers/FavoriteController');
const  checkToken = require('../middlewares/checkToken')
const  checkTokenAdmin = require('../middlewares/checkTokenAdmin')

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
    .post(checkToken, FavoriteController.createFavorite)
    .get(checkToken, FavoriteController.showUserFavorites);

router.route('/:id/favorites/:favoriteId')
    .put(checkToken, FavoriteController.editFavorite)
    .delete(checkToken, FavoriteController.deleteFavorite);

// Rota para buscar usuário por nome de usuário
router.get('/search/:username', UserController.showUserByUsername);

router.get('/',UserController.index);

module.exports = router;