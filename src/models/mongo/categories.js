'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const categories = mongoose.Schema({
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

categories.pre('validate', function() {
  console.log('Validating...');
});

categories.pre('save', function() {
  console.log('Saving...', this);
});

categories.post('save', function() {
  console.log('Saved!', this);
});

export default mongoose.model('categories', categories);