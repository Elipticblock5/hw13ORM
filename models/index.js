// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//added foreign category_id
Product.belongsTo(Category, {
  foreignKey: 'category_id',
}); 

// Categories have many Products
//adding trhough product tage
Category.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// Products belongToMany Tags (through ProductTag)
//adding belong too and foreign key
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// Tags belongToMany Products (through ProductTag)
//adding belong to and foreign key
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
