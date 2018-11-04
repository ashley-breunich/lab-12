'use strict';

import Model from './model.js';
import schema from './mongo/categories.js';

class Categories extends Model {}

const categories = new Categories(schema);

export default categories; 