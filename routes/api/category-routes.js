const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  //using findAll method
  Category.findAll({
    
  
     // attributes: ["id", "category_id"], does not require
  // be sure to include its associated Products

  include: 
    {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    } 
  
  })

  .then(dbTheCategoriesData => {
    if (!dbTheCategoriesData) {
      res.status(404).json({ message: 'We could not find any categories.'});
      return;
    }
    res.json(dbTheCategoriesData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  //using findOne method

  Category.findOne({
    where: {
      id: req.params.id
    },


    include: 
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    })


//then statment for findONE
  .then(dbTheCategoriesData => {

    //using logical not operator
    if (!dbTheCategoriesData) {
      res.status(404).json({ message: 'We cannot find a category with this ID.'});
      return;
    }
    res.json(dbTheCategoriesData);
  })

  //copied catch err from above
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

  // be sure to include its associated Products
});


//post route

router.post('/', (req, res) => {
  // create a new category
  //create method used


  Category.create({
    category_id: req.body.category_id
  })

  //fixed typo
  .then(dbTheCategoriesData => res.json(dbTheCategoriesData))
  

  //catch err copied from above
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//put route
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //update method

  Category.update(req.body, {
    //{
     // category_id: req.body.category_id,
    //},

    
      where: {
        id: req.params.id
      } //req.params.id,
    })
  
  
    //same then statement as above
  .then((dbTheCategoriesData) => {
    if (!dbTheCategoriesData) {
      res.status(404).json({ message: "No category with this ID." });
      return;
    }
    res.json(dbTheCategoriesData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // destroy method


  Category.destroy({
    where: {
      id: req.params.id
    }

    //then statement
  })
    .then(dbTheCategoriesData => {
      //reuse logical not
      if (!dbTheCategoriesData) {
        res.status(404).json({ message: 'No category with this ID.' });
        return;
      }
      res.json(dbTheCategoriesData);
    })

    //catch err brought down
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


});

module.exports = router;
