const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
 
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [{
            model: Category,
            attributes: ['category_id']
        },
        {
            model: Tag,
            attributes: ['tag_name']
        }
    ]
})
.then(dbTheProductsData => res.json(dbTheProductsData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
  
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [{
            model: Category,
            attributes: ['category_id']
        },
        {
            model: Tag,
            attributes: ['tag_name']
        }
    ]
})
.then(chooseOne => {
    if (!chooseOne) {
      //sample message for debugging
        res.status(404).json({ message: 'No product with this id (chooseOne)' });
        return;
    }
    res.json(chooseOne);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// create new product
router.post('/', (req, res) => {
  

    Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tagIds
  })

  .then((product) => {

      if (req.body.tagIds.length) {
          const productTagIdArray = req.body.tagIds.map((tag_id) => {
              return {
                  product_id: product.id,
                  tag_id,
              };
          });
          return ProductTag.bulkCreate(productTagIdArray);
      }

      res.status(200).json(product);
  })


  .then((newProducts) => res.status(200).json(newProducts))
  .catch((err) => {
      console.log(err);
      res.status(400).json(err);
  });
});



// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })


    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      //from starter code
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      //filter method
      const productTagsToRemove = productTags
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })

    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


// Delete API

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
        id: req.params.id
    }
})
.then(delateProduct=> {
    if (!deleteProduct) {

      //custom error message for debugging
        res.status(404).json({ message: 'No product with this id (router.delete)' });
        return;
    }
    res.json(delateProduct);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
