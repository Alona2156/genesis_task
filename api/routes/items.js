const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/item');

router.get('/', (req, res, next) =>{
  Item.find({})
    .select('-_id -__v')
    .exec()
    .then(items =>{
      res.status(200).json({items: items, count: items.length});
    })
    .catch(error =>{
      res.status(500).json({
        error: error
      })
    })
})

module.exports = router;
