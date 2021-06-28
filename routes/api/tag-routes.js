const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { describe } = require('../../models/Product');

// The `/api/tags` endpoint



router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
   // attributes: ["id", "tag_name"],

    include: 
      {
        // be sure to include its associated Product data
        model: Product,
        attributes: ["id", "tag_name"],
      
       
      }
    })


    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  
});


//building gget routes, find one by id
router.get('/:id', (req, res) => {
 

  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: 
      {
        model: Product,
        attributes: ["id", "tag_name"],
      
      }
    
  })


    .then((singleTag) => {
      if (!singleTag) {
        res
          .status(404)

          //custom error for debugging
          .json({ message: "No tag with this ID (findOne)." });
        return;
      }
      res.json(singleTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});


//buidling post route
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })

    .then((createTag) => res.json(createTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



//building put route, update by ID value
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((updateTagId) => {
      if (!updateTagId) {
        res.status(404).json({ message: 'No tag was with this ID (router.put).' });
        return;
      }
      res.json(updateTagId);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


 // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
 
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((destroyTag) => {
      if (!destroyTag) {
        res.status(404).json({ message: 'No tag with this ID (router.delete).' });
        return;
      }
      res.json(describe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
