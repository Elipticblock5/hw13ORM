const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


//buildin get rout
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
   // attributes: ["id", "tag_name"],

    include: 
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
        //through: ProductTag,
       // as: "products",
      }
    })


    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Product data
});


//building gget routes
router.get('/:id', (req, res) => {
  // find a single tag by its `id`

  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: 
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        //through: ProductTag,
        //as: "products",
      }
    
  })


    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)

          //custom error for debugging
          .json({ message: "No tag with this ID (findOne)." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Product data
});


//buidling post route
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })

    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//building put route
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res
          .status(404)

          //custome error for debugging
          .json({ message: 'No tag was with this ID (router.put).' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          //custom error for debugging
          .json({ message: 'No tag with this ID (router.delete).' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
