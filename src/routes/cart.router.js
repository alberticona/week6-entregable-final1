const { getAll, create, remove, update, getOne } = require('../controllers/cart.controllers');
const express = require('express');

const routerCart = express.Router();

routerCart.route('/')
    .get(getAll)
    .post(create);

routerCart.route('/:id')
    .delete(remove)
    .put(update)
    .get(getOne);

module.exports = routerCart;