const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Tag.findAll(
    {
      include:[{model:Product, through:ProductTag}]
    }
  ).then(TagData => res.json(TagData))
  .catch(err => res.json(err))
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Tag.findOne(
    {
      where:{id:req.params.id},
      include:[{model:Product, through:ProductTag}]
    }
  ).then(TagData => res.json(TagData))
  .catch(err => res.json(err))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Tag.create(req.body).then(TagData => res.json(TagData))
  .catch(err => res.json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Tag.update(req.body,{where:{id:req.params.id}}).then(TagData => res.json(TagData))
  .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({where:{id:req.params.id}}).then(TagData => res.json(TagData))
  .catch(err => res.json(err))
});

module.exports = router;
