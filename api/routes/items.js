const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/item');

router.get('/', (req, res, next) =>{
  Item.find({})
    .select('-__v')
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

router.put('/update', (req, res, next) =>{
  var id = req.body._id;
  var item = req.body;
  Item.findByIdAndUpdate(id, item, {overwrite: true, new: true})
  .exec()
  .then(result =>{
    res.status(200).json(result);
  })
  .catch(error =>{
    res.status(500).json({
      error: error
    })
  })
})

router.delete('/delete', (req, res, next) =>{
  var id = req.query._id;
  Item.remove({_id: id})
  .exec()
  .then(result =>{
    res.status(200).json(result);
  })
  .catch(error =>{
    res.status(500).json({
      error: error
    })
  })
})

module.exports = router;
