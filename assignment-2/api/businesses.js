const router = require('express').Router()
const { ValidationError } = require('sequelize')

const Business = require('../models/business')
const Review = require('../models/review')
const Photo = require('../models/photo')

exports.router = router

/*
 * Route to return a list of businesses.
 */
router.get('/', async (req, res) => {

  /*
   * Compute page number based on optional query string parameter `page`.
   * Make sure page is within allowed bounds.
   */
  let page = parseInt(req.query.page) || 1

  const pageSize = 10
  const offset = (page - 1) * pageSize

  const result = await Business.findAndCountAll({
    limit: pageSize,
    offset: offset
  })
  
  const lastPage = Math.ceil(result.count / pageSize)

  /*
   * Generate HATEOAS links for surrounding pages.
   */
  const links = {}

  if (page < lastPage) {
    links.nextPage = `/businesses?page=${page + 1}`
    links.lastPage = `/businesses?page=${lastPage}`
  }

  if (page > 1) {
    links.prevPage = `/businesses?page=${page - 1}`
    links.firstPage = '/businesses?page=1'
  }

  /*
   * Construct and send response.
   */
  res.status(200).send({
    pageNumber: page,
    totalPages: lastPage,
    pageSize: pageSize,
    totalCount: result.count,
    businesses: result.rows,
    links: links
  })

})

/*
 * Route to create a new business.
 */
router.post('/', async (req, res, next) => {
  try {
    const business = await Business.create(req.body, [
      'ownerid',
      'name',
      'address',
      'city',
      'state',
      'zip',
      'phone',
      'category',
      'subcategory',
      'website',
      'email',
    ])

    console.log(business.toJSON())

    res.status(201).send({
      id: business.id
    })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(404).send({
        err: e.message
      })
    } else {
      throw e
    }
  }
})

/*
 * Route to fetch info about a specific business.
 */
router.get('/:businessid', async (req, res, next) => {
  const businessid = parseInt(req.params.businessid)

  const business = await Business.findAll({
    where: { 'id': businessid },
    include: [
      Review,
      Photo
    ]
  })

  if (business.length > 0) {
    res.status(200).send(business)
  } else {
    next()
  }
})

/*
 * Route to replace data for a business.
 */
router.put('/:businessid', async (req, res, next) => {
  const businessid = parseInt(req.params.businessid)

  const result = await Business.update(req.body, {
    where: { id: businessid },
    fields: [
      'ownerid',
      'name',
      'address',
      'city',
      'state',
      'zip',
      'phone',
      'category',
      'subcategory',
      'website',
      'email',
    ]
  }) 

  if (result[0] > 0) {
    res.status(204).send()
  } else {
    next()
  }
})

/*
 * Route to delete a business.
 */
router.delete('/:businessid', async (req, res, next) => {
  const businessid = parseInt(req.params.businessid)

  const result = await Business.destroy({ where: { id: businessid } })

  if(result > 0) {
    res.status(204).send()
  } else {
    next()
  }
})
