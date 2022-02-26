const Cars = require('../cars/cars-model')
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) =>{
const {id} = req.params; 
    try{
      const car = await Cars.getById(id);
        if(!car){
          res.status(404).json({ message: `car with id ${id} is not found` });
        }else{
          req.car = car ;
          next();
        }
    }catch(e){
      res.status(500).json({message: `Error: ${e.message}`});
    }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if(!vin){
    res.status(400).json({ message: `vin is missing`})
  }else if(!make){
    res.status(400).json({ message: `make is missing`})
  }else if(!model){
    res.status(400).json({ message: `model is missing`})
  }else if(!mileage){
    res.status(400).json({ message: `mileage is missing`})
  }else{
    next();
  }
}

  const checkVinNumberValid = (req, res, next) => {
    var isValidVin = vinValidator.validate(res.body.vin);
    const dbVin = Cars.getByVin(req.body.vin)
    if(isValidVin){
        res.status(200);
        next();
    }else{
        res.status(400).json( { message: `vin ${dbVin} is invalid` })
    }
}

  const checkVinNumberUnique = async (req, res, next) => {
    try{
        const dbVin = await Cars.getByVin(req.body.vin)
      if(dbVin){
        res.status(400).json({ message: `vin ${dbVin} already exists` })
      }else{
        res.status(200)
        next()
      }
      }catch(err){
        next(err)
      } 
  }


  module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
  }