
const {Model , DataTypes}=require("sequelize"); // Model is a base class provided by Sequelize 
const sequelize = require("../config/db")

class Url extends Model{}

Url.init(
    {
        longUrl: {
            type: DataTypes.STRING,  //DataTypes is an object provided by Sequelize that contains various data types supported by different databases
            allowNull:false
        },
        shortUrl: {
            type: DataTypes.STRING,
            allowNull:false
        },
    },
    {
        sequelize, modelName:"Url", tableName:"urls-mapping" // Optionally specify the table name (defaults to plural of model name)
    }


)
module.exports= Url;
