const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

//findall api

router.get('/', (req, res) => {
  
  Category.findAll({
    


  
  attributes: [
    'id',
    'category_name'
  ],
  
   include: [Product]
  })

  .then(dbTheCategoriesData => res.json(dbTheCategoriesData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });
  


//fine one by id api

router.get('/:id', (req, res) => {


  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 'category_name'
    ],
   
    include: [Product]
      

       
      
    })

    
  .then(dbTheCategoriesData => res.json(dbTheCategoriesData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });

 



// post route for new by name

router.post('/', (req, res) => {
  

  Category.create({
    category_name: req.body.category_name
  })

  
  .then(newCategoryDB => res.json(newCategoryDB))
  

  //catch err copied from above
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//put route API done by ID value

router.put('/:id', (req, res) => {
  

  Category.update(
    
    {
      category_name: req.body.category_name 
  
    },
    {
      where: {
        id: req.params.id
      } 

    })
  
  
    
  .then((updatedCatID) => {
    if (!updatedCatID) {
      res.status(404),json({ message: "No category found with this id" });
      return;
    }
    res.json(updatedCatID);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.delete('/:id', (req, res) => {

  // destroy method


  Category.destroy({
    where: {
      id: req.params.id
    }

   
  })
    .then(updatedCatID => {
      //reuse logical not
      if (!updatedCatID) {

        //sample message for debugging
        res.status(404).json({ message: 'No category with this ID (category.destroy).' });
        return;
      }
      res.json(updatedCatID);
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


});

module.exports = router;
