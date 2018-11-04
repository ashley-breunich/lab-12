'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const categories = mongoose.Schema({
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

categories.pre('validate', function() {
  console.log('Validating some stuff');
});

categories.pre('save', function() {
  console.log('About to save some stuff', this);
});

categories.post('save', function() {
  console.log('Saved', this);
});

export default mongoose.model('categories', categories);