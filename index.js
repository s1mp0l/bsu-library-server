require('dotenv').config()

const {crud} = require('express-crud-router')

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const sequelizeCrud = require("express-crud-router-sequelize-v6-connector");

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(crud('/admin/users', sequelizeCrud.default(models.User)))
app.use(crud('/admin/books', sequelizeCrud.default(models.Book)))
app.use(crud('/admin/details', sequelizeCrud.default(models.BookDetails)))
app.use(crud('/admin/categories', sequelizeCrud.default(models.Category)))
app.use(crud('/admin/history', sequelizeCrud.default(models.HistoryItem)))
app.use(crud('/admin/images', sequelizeCrud.default(models.Image)))
app.use(crud('/admin/reviews', sequelizeCrud.default(models.Review)))


// Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()