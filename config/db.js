const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("url-shortener-db", "Priyanka","priyanka@8888",{
    dialect:"sqlite",
    host:"./config/db.sqlite"
})


module.exports = sequelize;