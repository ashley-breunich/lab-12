'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const products = new mongoose.Schema({
  category: {type:String, require: true},
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

products.pre('validate', function() {
  try {
    console.log('Validating...');
  }
  catch(e) {
    console.error(e);
  }
});

products.pre('save', function() {
  try {
    console.log('Saving...', this);
  }
  catch(e) {
    console.error(e);
  }
});
  
products.post('save', function() {
  try {
    console.log('Saved!', this);
  }
  catch(e) {
    console.error(e);
  }
});

export default mongoose.model('products', products);