const express = require("express");
const router = express.Router();
const {nanoid}= require("nanoid");
const createDB = require("../config/db");
const Url = require("../models/urlModels")
const baseUrl = "http://localhost:1332"
createDB.sync().then(()=>{
    console.log("DB is running");
})

// taking the longurl from user and sending a shorturl to user
router.post("/shortUrl" , async (req,res)=>{
    try{
      
        const {longUrl}=req.body;
       
         //longurl -> id
         const shortId = nanoid(4); 

         //store in db
         const shortUrl = await Url.create({//Insert into table
            longUrl,
            shortUrl:shortId    
         })
         const user = await Url.findAll()
         console.log(user)

         return res.status(200).json({
            status:"ok",
            shortUrl:`${baseUrl}/${shortId}`
         })
          
       
    }
    
    catch(error)
    {
        console.log("error=",error) 
        return res.status(500).send(error)
    }

 
})

//taking a shorturl from user and redirecting into longurl 

router.get("/:shortid", async (req,res)=>{   //here :shortid is a variable
    //   console.log(req.params.shortid)   
    try{

        const url = await Url.findOne({ 
            where: {
                shortUrl: req.params.shortid
            }
        })
       
        // console.log(url.longUrl)
        if(!url){
            res.status(404).send("Invalid short url")
        }
      return  res.redirect(url.longUrl)
    }catch(e)
    {
        res.status(500).send(e);
    }
} )

// async function deleteAllUsers() {
//     try {
//      const deleted =await Url.destroy({
//         where: {}, // Empty where clause deletes all rows
//         truncate: true, // Truncate table (reset auto-increment primary key)
        
//       });
//       console.log('All users deleted successfully.', deleted);
//     } catch (error) {
//       console.error('Error deleting users:', error);
//     }
//   }
  
//   // Call the function to delete all users
//   deleteAllUsers();

module.exports = router;