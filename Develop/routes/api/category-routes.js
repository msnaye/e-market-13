const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//Get/api/category
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Access our User model and run .findAll() method)
  Category.findAll({
    include:[
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  }).then(dbCatData =>{
    if (!dbCatData){
      res.status(404).json({ message: 'No category matching that id'});
      return;
    }
    res.json(dbCatData);
  }).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  })
  });
//Get/api/category/1
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  }).then(dbCatData =>{
    if (!dbCatData) {
      res.status(404).json({message:'No category matching that id'})
      return;
    }
    res.json(dbCatData);
  }).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  })
  });
  //POST/api/category
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
    })
    .then(dbCatData=> res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  //Put/api/category1
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id: req.params.id
    }
  })
  .then(dbCatData=>{
    if (!dbCatData[0]){
      res.status(404).json({message:'No category matching that id'});
      return;
    }
    res.json(dbCatData);
  }).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});
//DELETE/api/category1
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ 
    where:{
      id: req.params.id
    }
  })
  .then(dbCatData => {
    if(!dbCatData){
      res.status(404).json({message:'No category matching that id'});
      return;
    }
    res.json(dbCatData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
