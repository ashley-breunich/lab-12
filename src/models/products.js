'use strict';

import Model from './model.js';
import schema from './mongo/products.js';

class Products extends Model {}

const products = new Products(schema);

export default products; 