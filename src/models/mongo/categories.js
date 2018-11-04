'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const categories = new mongoose.Schema({
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

categories.virtual('products', {
  ref: 'products',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

categories.pre('find', function() {
  try {
    console.log('joining...');
    this.populate('products');
  }
  catch(e) {
    console.error(e);
  }
});

categories.pre('validate', function() {
  try {
    console.log('Validating...');
  }
  catch(e) {
    console.error(e);
  }
});

categories.pre('save', function() {
  try {
    console.log('Saving...', this);
  }
  catch(e) {
    console.error(e);
  }
});

categories.post('save', function() {
  try {
    console.log('Saved!', this);
  }
  catch(e) {
    console.error(e);
  }
});

export default mongoose.model('categories', categories);