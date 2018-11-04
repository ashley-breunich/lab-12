'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const products = mongoose.Schema({
  category: {type:String, require: true},
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

products.pre('validate', function() {
  console.log('Validating...');
});

products.pre('save', function() {
  console.log('Saving...', this);
});

products.post('save', function() {
  console.log('Saved!', this);
});

export default mongoose.model('products', products);