const router = require('express').Router()

exports.router = router

const Photo = require('../models/photo')
const Review = require('../models/review')
const Business = require('../models/business')

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', async (req, res) => {
  const userid = parseInt(req.params.userid)
  let page = parseInt(req.query.page) || 1

  const pageSize = 10
  const offset = (page - 1) * pageSize

  const result = await Business.findAndCountAll({
    where: { ownerid: userid },
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
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', async (req, res) => {
  const userid = parseInt(req.params.userid)
  let page = parseInt(req.query.page) || 1

  const pageSize = 10
  const offset = (page - 1) * pageSize

  const result = await Review.findAndCountAll({
    where: { userid: userid },
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
    reviews: result.rows,
    links: links
  })
})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', async (req, res) => {
  const userid = parseInt(req.params.userid)
  let page = parseInt(req.query.page) || 1

  const pageSize = 10
  const offset = (page - 1) * pageSize

  const result = await Photo.findAndCountAll({
    where: { userid: userid },
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
    photos: result.rows,
    links: links
  })
})
