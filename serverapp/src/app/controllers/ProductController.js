const Product = require('../models/Product')
const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/Category')
const Tag = require('../models/Tag')
const { json } = require('express')
const ObjectId = require('mongodb').ObjectID
const mongoose = require('mongoose')
const encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64')
}
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })
var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'shoplaptop',
    api_key: '672421112872878',
    api_secret: 'zmqOX3J_4CliR5GifTptxoceHro',
    secure: true,
})
mongoose.Promise = global.Promise
function generateSortOptions(sortFields, sortAscending = true) {
    const sort = {}
    const sortType = sortAscending ? 1 : -1
    return new Promise((resolve) => {
        if (!!sortFields && sortFields.length > 0) {
            sortFields.forEach((field) => {
                switch (field) {
                    case 'Product_Code': {
                        sort.Product_Code = sortType
                        break
                    }
                    case 'Product_Detail': {
                        sort.Product_Detail = sortType
                        break
                    }
                    case 'Product_Barcode': {
                        sort.Product_Barcode = sortType
                        break
                    }
                    case 'Product_Mass': {
                        sort.Product_Mass = sortType
                        break
                    }
                    case 'Product_Name': {
                        sort.Product_Name = sortType
                        break
                    }
                    case 'Product_Category': {
                        sort.Product_Category = sortType
                        break
                    }
                    case 'Product_Group': {
                        sort.Product_Group = sortType
                        break
                    }
                    case 'Product_Unit': {
                        sort.Product_Unit = sortType
                        break
                    }
                    case 'Product_Supplier': {
                        sort.Product_Supplier = sortType
                        break
                    }
                    case 'Product_Minstock': {
                        sort.Product_Minstock = sortType
                        break
                    }
                    case 'Product_Dimension': {
                        sort.Product_Dimension = sortType
                        break
                    }
                    case 'Product_Sellprice': {
                        sort.Product_Sellprice = sortType
                        break
                    }
                    case 'Product_Stockprice': {
                        sort.Product_Stockprice = sortType
                        break
                    }
                    case 'Product_Description': {
                        sort.Product_Description = sortType
                        break
                    }
                    case 'Product_Original': {
                        sort.Product_Original = sortType
                        break
                    }
                    case 'Status': {
                        sort.Status = sortType
                        break
                    }
                    case 'CreatedBy': {
                        sort.CreatedBy = sortType
                        break
                    }
                    case 'CreatedDate': {
                        sort.CreatedDate = sortType
                        break
                    }
                    case 'UpdatedBy': {
                        sort.UpdatedBy = sortType
                        break
                    }
                    case 'UpdatedDate': {
                        sort.UpdatedDate = sortType
                        break
                    }
                    default:
                        break
                }
            })
            resolve(sort)
        } else {
            resolve({})
        }
    })
}
class ProductController {
    async create(req, res, next) {
        var productPicture = []
        if (req.body.productPicture.length > 0) {
            productPicture = await req.body.productPicture.map((item) => {
                return { img: item }
            })
        }
        
        let descriptionTable = [
            {
                baohanh: req.body.timeBaoHanh,
                Series: req.body.series,
                color: req.body.color,
                cpu: req.body.cpu,
                cardDohoa: req.body.card,
                ram: req.body.ram,
                manhinh: req.body.manhinh,
                ocung: req.body.ocung,
                hedieuhanh: req.body.hedieuhanh,
                khoiluong: req.body.khoiluong,
            },
        ]
        const product = new Product({
            name: req.body.name,
            slug: slugify(req.body.name),
            regularPrice: req.body.regularPrice,
            salePrice: req.body.salePrice,
            quantity: req.body.quantity,
            description: req.body.description,
            descriptionTable: descriptionTable,
            productPicture,
            tag: req.body.listTag,
            category: req.body.categoryId,
            createdBy: req.user.id,
        })
        product.save((error, product) => {
            if (error) return res.status(400).json({ error })
            if (product) {
                res.status(201).json({ product })
            }
        })
    }

    // async updateProduct(req, res, next) {
        // var productPicture = []
        // if (req.files.length > 0) {
        //     productPicture = req.files.map((file) => {
        //         return { img: file.filename }
        //     })
        // }
    //     let descriptionTable = [
    //         {
    //             baohanh: req.body.timeBaoHanh,
    //             Series: req.body.series,
    //             color: req.body.color,
    //             cpu: req.body.cpu,
    //             cardDohoa: req.body.card,
    //             ram: req.body.ram,
    //             manhinh: req.body.manhinh,
    //             ocung: req.body.ocung,
    //             hedieuhanh: req.body.hedieuhanh,
    //             khoiluong: req.body.khoiluong,
    //         },
    //     ]
    //     Product.findOneAndUpdate(
    //         { _id: req.body.id },
    //         {
    //             $set: {
    //                 name: req.body.name,
    //                 regularPrice: req.body.regularPrice,
    //                 salePrice: req.body.salePrice,
    //                 quantity: req.body.quantity,
    //                 productPicture: req.body.productPicture,
    //                 description: req.body.description,
    //                 descriptionTable: descriptionTable,
    //                 category: req.body.categoryId,
    //             },
    //         },
    //         { new: true, upsert: true }
    //     ).exec((error, product) => {
    //         console.log(error)
    //         if (error) return res.status(400).json({ error })
    //         if (product) {
    //             res.status(201).json({ product })
    //         }
    //     })
    // }

    updateProduct = (req, res) => {
        // const ordStatus = Order.findById(req.body._id);
        // var productPicture = []
        // if (req.body.productPicture.length > 0) {
        //     productPicture = req.files.map((file) => {
        //         return { img: file.filename }
        //     })
        // }
        let descriptionTable = [
            {
                baohanh: req.body.timeBaoHanh,
                Series: req.body.series,
                color: req.body.color,
                cpu: req.body.cpu,
                cardDohoa: req.body.card,
                ram: req.body.ram,
                manhinh: req.body.manhinh,
                ocung: req.body.ocung,
                hedieuhanh: req.body.hedieuhanh,
                khoiluong: req.body.khoiluong,
            },
        ]
        Product.findOne({_id: req.body._id}, function(err, obj) {
            Product.updateOne(
                { 
                    _id: req.body._id, 
                },
                {
                    $set: {
                        name: req.body.name,
                        regularPrice: req.body.regularPrice,
                        salePrice: req.body.salePrice,
                        quantity: req.body.quantity,
                        productPicture: req.body.productPicture,
                        description: req.body.description,
                        descriptionTable: descriptionTable,
                        category: req.body.categoryId,
                    },
                }
            ).exec((error, product) => {
                if (error) return res.status(400).json({ error })
                if (product) {
                    res.status(201).json({ product })
                }
            })
        });
    }

    getProductByTag(req, res, next) {
        const { tag } = req.params
        Tag.findOne({ tag: tag })
            .select('_id nameTag')
            .exec((error, tag) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (tag) {
                    Product.find({ tag: tag._id }).exec(
                        (error, products) => {
                            if (error) {
                                return res.status(400).json({ error })
                            }

                            if (tag.tagName) {
                                if (products.length > 0) {
                                    res.status(200).json({
                                        tag,
                                        products,
                                    })
                                }
                            } else {
                                res.status(200).json({ products })
                            }
                        }
                    )
                }
            })
    }

    getProductBySlug(req, res, next) {
        const { slug } = req.params
        Category.findOne({ slug: slug })
            .select('_id type categoryImage')
            .exec((error, category) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (category) {
                    Product.find({ category: category._id }).exec(
                        (error, products) => {
                            if (error) {
                                return res.status(400).json({ error })
                            }

                            if (category.type) {
                                if (products.length > 0) {
                                    res.status(200).json({
                                        category,
                                        products,
                                    })
                                }
                            } else {
                                res.status(200).json({ products })
                            }
                        }
                    )
                }
            })
    }
    getProductDetailsById = (req, res) => {
        const { productId } = req.params
        if (productId) {
            if (myCache.has(`product${productId}`)) {
                res.status(200).json({
                    product: myCache.get(`product${productId}`),
                })
            } else {
                Product.findOne({ _id: productId })
                    .populate({ path: 'category', select: '_id name' })
                    .exec((error, product) => {
                        if (error) return res.status(400).json({ error })
                        if (product) {
                            myCache.set(`product${productId}`, product)
                            res.status(200).json({ product })
                        }
                    })
            }
        } else {
            return res.status(400).json({ error: 'Params required' })
        }
    }
    deleteProductById = (req, res) => {
        const { productId } = req.body.payload
        if (productId) {
            Product.deleteMany({ _id: productId }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } else {
            res.status(400).json({ error: 'Params required' })
        }
    }

    getProducts = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const products = await Product.find({})
                .populate({ path: 'tag' })
                .populate({ path: 'category', select: '_id name' })
                .exec()
            myCache.set('allProducts', products)
            res.status(200).json({ products })
        } catch (error) {
            console.log(error)
        }
    }
    async getAllProducts(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allProducts')) {
            res.status(200).json({ allProducts: myCache.get('allProducts') })
        } else {
            const allProducts = await Product.find({})
            .populate({
                path: 'category',
                select: '_id name',
            })
            .populate({path: 'tag'})
            if (allProducts) {
                myCache.set('allProducts', allProducts)
                res.status(200).json({ allProducts })
            }
        }
    }
    uploadPicture = async (req, res, next) => {
        try {
            const fileStr = req.body.data
            const productPicture = await fileStr.map(async (item) => {
                const uploadResponse = await cloudinary.uploader.upload(item)
                return uploadResponse.url
            })
            Promise.all(productPicture).then((result) => {
                res.json({ result })
            })
        } catch (err) {
            console.log(err)
        }
    }
    search = async function (req, res) {
        const query = {}
        const { page } = req.body.searchOptions
        const limit = parseInt(req.body.searchOptions.limit, 10)
        const sortFields = req.body.searchOptions.sort
        const sortAscending = req.body.searchOptions.sortAscending
        //Tạo điều kiện sắp xếp
        const sort = await generateSortOptions(sortFields, sortAscending)
        const options = {
            //select:   'Status',
            sort,
            page,
            limit,
            lean: true,
        }

        const searchModel = req.body.searchModel

        //Tạo query get data theo permissio
        if (
            typeof searchModel.Product_Code === 'string' &&
            !!searchModel.Product_Code
        ) {
            query.Product_Code = {
                $regex: new RegExp(searchModel.Product_Code, 'i'),
            }
        } else if (
            typeof searchModel.Product_Code === 'object' &&
            !!searchModel.Product_Code &&
            searchModel.Product_Code.length > 0
        ) {
            query.Product_Code = { $in: searchModel.Product_Code }
        } else if (
            !!searchModel.Product_Code &&
            Array.isArray(searchModel.Product_Code) &&
            searchModel.Product_Code.length > 0
        ) {
            query.Product_Code = { $in: searchModel.Product_Code }
        }
        if (!!searchModel.Product_Name) {
            query.Product_Name = {
                $regex: new RegExp(searchModel.Product_Name, 'i'),
            }
        }
        if (!!searchModel.Product_Description) {
            query.Product_Description = {
                $regex: new RegExp(searchModel.Product_Description, 'i'),
            }
        }
        if (
            !!searchModel.Product_Category &&
            searchModel.Product_Category.length > 0
        ) {
            query.Product_Category = { $in: searchModel.Product_Category }
        }
        if (
            !!searchModel.Product_Group &&
            searchModel.Product_Group.length > 0
        ) {
            query.Product_Group = { $in: searchModel.Product_Group }
        }
        if (!!searchModel.Status && searchModel.Status.length > 0) {
            query.Status = { $in: searchModel.Status }
        }
        if (!!searchModel.CreatedDate && searchModel.CreatedDate.length === 2) {
            const dateFrom = new Date(searchModel.CreatedDate[0])
            const startDate = new Date(
                dateFrom.getFullYear(),
                dateFrom.getMonth(),
                dateFrom.getDate(),
                0,
                0,
                0
            )
            const dateTo = new Date(searchModel.CreatedDate[1])
            const endDate = new Date(
                dateTo.getFullYear(),
                dateTo.getMonth(),
                dateTo.getDate(),
                23,
                59,
                59
            )
            query.CreatedDate = { $gte: startDate, $lte: endDate }
        }
        if (!!searchModel.UpdatedDate && searchModel.UpdatedDate.length === 2) {
            const dateFrom = new Date(searchModel.UpdatedDate[0])
            const startDate = new Date(
                dateFrom.getFullYear(),
                dateFrom.getMonth(),
                dateFrom.getDate(),
                0,
                0,
                0
            )
            const dateTo = new Date(searchModel.UpdatedDate[1])
            const endDate = new Date(
                dateTo.getFullYear(),
                dateTo.getMonth(),
                dateTo.getDate(),
                23,
                59,
                59
            )
            query.UpdatedDate = { $gte: startDate, $lte: endDate }
        }

        Product.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                returnCode: 1,
                result,
            })
        })
    }
    getDataFilter = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
            populate: [
                {
                    path: 'category',
                    select: '_id name',
                },
            ],
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.ProductName &&
            Array.isArray(searchModel.ProductName) &&
            searchModel.ProductName.length > 0
        ) {
            query._id = { $in: searchModel.ProductName }
        }

        if (!!searchModel.Price) {
            query.salePrice = { $in: searchModel.Price }
        }

        if (!!searchModel.CategoryId && searchModel.CategoryId.length > 0) {
            query.category = { $in: searchModel.CategoryId }
        }

        if (!!searchModel.Status && searchModel.Status.length > 0) {
            query.Status = { $in: searchModel.Status }
        }
        Product.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }
    searchProducts = async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        const { q, sortOrder, sortBy, categoryId } = req.body.data.payload
        const listQuery = []
        if (q !== '') {
            const searchName = q
            const rgx = (pattern) => new RegExp(`.*${pattern}.*`)
            const searchNameRgx = rgx(searchName)

            if (categoryId) {
                const searchQuery = {
                    $match: {
                        name: { $regex: searchNameRgx, $options: 'i' },
                        category: ObjectId(categoryId),
                    },
                }
                listQuery.push(searchQuery)
            } else {
                const searchQuery = {
                    $match: { name: { $regex: searchNameRgx, $options: 'i' } },
                }
                listQuery.push(searchQuery)
            }
        }
        /*  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchNameRgx = rgx(stringQuery); */
        /* const products = await Product.find({
      name: { $regex: searchNameRgx, $options: "i" },
    }); */
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1
            listQuery.push({ $sort: { [sortBy]: order } })
        }
        /* if (categoryId) {
      const singeQuery = {
        $match: {
         category:categoryId
        },
      };
      listQuery.push(singeQuery);
    } */

        /*  if (sortBy) {
      const order = sortOrder === "asc" ? 1 : -1;
      listQuery.push({ $sort: { [sortBy]: order } });
    }  */

        /* const rangeFilter = "..";
    const collectionFilter = ",";
    for (const filter in filters) {
      const element = filters[filter];

      if (element.indexOf(rangeFilter) !== -1) {
        const max = 99999999999999;
        const min = 0;
        const fromToRawInput = element.split(rangeFilter);

        const selectValueAndRemoveUnit = (input) => {
          let endOfValue = 0;

          if (input.match(/[^0-9]/)) {
            endOfValue = input.match(/[^0-9]/).index;
            return input.slice(0, endOfValue);
          } else {
            return input;
          }
        };

        const fromTo = fromToRawInput.map(selectValueAndRemoveUnit);

        const from = fromTo[0] === "" ? min : parseFloat(fromTo[0]);
        const to = fromTo[1] === "" ? max : parseFloat(fromTo[1]);

        const rangeQuery = {
          $match: {
            $or: [
              { [filter]: { $gte: from, $lte: to } },
              {
                categoryInfo: {
                  $elemMatch: { name: filter, value: { $gte: from, $lte: to } },
                },
              },
            ],
          },
        };

        listQuery.push(rangeQuery);
      } else {
        if (element.indexOf(collectionFilter) !== -1) {
          const collections = element.split(collectionFilter);

          const collectionQuery = {
            $match: {
              $or: [
                { [filter]: { $in: collections } },
                {
                  categoryInfo: {
                    $elemMatch: { name: filter, value: { $in: collections } },
                  },
                },
              ],
            },
          };

          listQuery.push(collectionQuery);
        } else {
          const singeQuery = {
            $match: {
              $or: [
                { [filter]: element },
                {
                  categoryInfo: {
                    $elemMatch: { name: filter, value: element },
                  },
                },
              ],
            },
          };

          listQuery.push(singeQuery);
        }
      }
    } */

        try {
            const productsFilter = await Product.aggregate(listQuery).exec()
            if (productsFilter) {
                res.status(200).json({ productsSearch: productsFilter })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ProductController()
