const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING}
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    authors: {type: DataTypes.STRING},
    issueYear: {type: DataTypes.STRING},
    rating: {type: DataTypes.INTEGER},
    about: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
})

const BookDetails = sequelize.define('detail', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    publisher: {type: DataTypes.STRING},
    year: {type: DataTypes.INTEGER},
    pages: {type: DataTypes.STRING},
    cover: {type: DataTypes.STRING},
    format: {type: DataTypes.STRING},
    genre: {type: DataTypes.STRING},
    weight: {type: DataTypes.STRING},
    isbn: {type: DataTypes.STRING},
    manufacturer: {type: DataTypes.STRING}
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    rating: {type: DataTypes.INTEGER},
    comment: {type: DataTypes.STRING}
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    path: {type: DataTypes.STRING, unique: true},
    alt: {type: DataTypes.STRING},
})

const HistoryItem = sequelize.define('historyItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dateHanded: {type: DataTypes.STRING, unique: true},
    dateReturned: {type: DataTypes.STRING},
})

User.hasMany(HistoryItem)
User.hasMany(Image)
HistoryItem.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Category.hasMany(Book)
Book.belongsTo(Category)

Book.hasMany(Image)
Image.belongsTo(Book)

Book.hasOne(BookDetails)
BookDetails.belongsTo(Book)

Book.hasMany(HistoryItem)
HistoryItem.belongsTo(Book)

Book.hasMany(Review)
Review.belongsTo(Book)

module.exports = {
    User,
    Category,
    Book,
    BookDetails,
    Review,
    Image,
    HistoryItem
}