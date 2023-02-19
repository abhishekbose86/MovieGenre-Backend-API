const express = require("express");
const genreRoute = express.Router();
const Joi = require("joi");
const genreModel = require("../models/genreModels");





genreRoute.post("/", async function(req,res){

    var result = validateGenre(req.body);
    if (result.error){
        console.log("Validation Error"+result.error);
        res.status(400).send("Bad request,missing manafatory paremeters in the request body");
    }

    result =  await genreModel.find({name:req.body.name});
    if (result.length > 0){
        res.status(400).send("Bad request,movie name already present use PUT request to update");
    }
    
    else 
    {
        const newGenre = new genreModel({
        name : req.body.name,
        category : req.body.category

        });
        try{
            result =  await newGenre.save();
            res.send(newGenre);
        }
        catch (error){
            console.log("Error "+error);
        }
    }    
})
genreRoute.get("/", async function(req,res){

  try{
        result =  await genreModel.find({});
        res.send(result);
    }
    catch (error){
        console.log("Error "+error);
    }

})

genreRoute.get("/name/:name", async function(req,res){

    try{
          result =  await genreModel.find({name:req.params.name});
          if (result.length==0)
          res.status(404).send("No movies with that name found in DB");
        else
          res.send(result);
          
      }
      catch (error){
          console.log("Error "+error);
      }
  
  })
  genreRoute.get("/category/:category", async function(req,res){

    try{
          result =  await genreModel.find({category:req.params.category});
          if (result.length==0)
            res.status(404).send("No movies with that category found in DB");
          else
            res.send(result);
      }
      catch (error){
          console.log("Error "+error);
      }
  
  })

  genreRoute.delete("/name/:name", async function(req,res){

    try{
          result =  await genreModel.find({name:req.params.name});
          if (result.length==0)
            res.status(404).send("No movies with that category found in DB");
          else{
            result =  await genreModel.findOneAndDelete({name:req.params.name});
            res.send("Movie removed from the DB");
          }
            
      }
      catch (error){
          console.log("Error "+error);
      }
  
  })
  genreRoute.put("/", async function(req,res){

    try{  
        var result = validateGenre(req.body);
        if (result.error){
            console.log("Validation Error"+result.error);
            res.status(400).send("Bad request,missing manafatory paremeters in the request body");
        } 
        else {
            result =  await genreModel.find({name:req.body.name});
            if (result.length==0)
              res.status(404).send("No movies with that name found in DB");
            else {
              result =  await genreModel.findOneAndUpdate({name:req.body.name},{category:req.body.category});
              res.send("Record updated successfully");
            }
        } 

            
      }
      catch (error){
          console.log("Error "+error);
      }
  
  })
function validateGenre(req) {

const joi_schema = Joi.object({
    name : Joi.string().required(),
    category : Joi.string().required()
});

return joi_schema.validate(req);

}
module.exports = genreRoute;