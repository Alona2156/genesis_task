const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = ({
  name: {type: String},
  height: {type: Number},
  mass: {type: Number},
  hair_color: {type: String},
  skin_color: {type: String},
  eye_color: {type: String},
  birth_year: {type: String},
  gender: {type: String}
});

module.exports = mongoose.model("Item", itemSchema);
