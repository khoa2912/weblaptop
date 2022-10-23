const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var moment = require('moment');
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const env = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const route = require('./routes')
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 60 })
var cron = require('node-cron');
const Product = require('./app/models/Product')
// connect to db
app.use(cookieParser())

db.connect()
env.config()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'uploads')))
// HTTP Logger
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.use(cors())

// template engine

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
const PORT = process.env.PORT || 3001
// Routes Init
cron.schedule(
    '* * * * *',
    async () => {
        const allProducts = await Product.find({}).populate({
            path: 'category',
            select: '_id name',
        })
        // eslint-disable-next-line prefer-const
        let productWarning = []
        // eslint-disable-next-line array-callback-return
        allProducts.map((item) => {
            if (item.quantity - item.quantitySold <= 10) {
                productWarning.push(item)
            }
        })
        myCache.set('productWarning', productWarning)
    },
    {
        scheduled: true,
    }
)
app.get('/productWarning',async (req, res) => {
    try {
        if (myCache.has('productWarning')) {
            res.status(200).json({
                productWarning: myCache.get('productWarning'),
            })
        } else {
            const allProducts = await Product.find({}).populate({
                path: 'category',
                select: '_id name',
            })
            // eslint-disable-next-line prefer-const
            let productWarning = []
            // eslint-disable-next-line array-callback-return
            allProducts.map((item) => {
                
                if (item.quantity - item.quantitySold <= 10) {
                    item['time'] = moment().format();
                    console.log(item)
                    productWarning.push(item)
                }
            })
            res.status(200).json({
                productWarning
            })
            myCache.set('productWarning', productWarning)
        }
    } catch (err) {
        console.log(err)
    }
})
route(app)
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
