const Driver = require('../models/driver')


module.exports = {

  greeting(req,res){
    res.send({'hi':'there'})
  },

  index(req,res,next){
    Driver.find({}).then((drivers)=>{console.log(drivers)})
    const {lng, lat} = req.query;
    console.log("************",lng,lat)
    Driver.aggregate(
                    [
                    {
                    '$geoNear': {
                    'near': {
                    'type': 'Point',
                    'coordinates': [parseInt(lng), parseInt(lat)]
                    },
                    'spherical': true,
                    'distanceField': 'dist',
                    'maxDistance': 10000000
                    }
                    }
                    ]
                    )
    .then(drivers => {
      console.log("drivers : ",drivers)
      res.send(drivers)})
    .catch(next)

  },

  create(req,res,next){
    console.log(req.body);// this will output the body of the request
    const driverProps = req.body
    Driver.create(driverProps).then(driver=>{
      console.log(driver._id)
      res.send(driver)})
    .catch(next)
  },

  edit(req,res,next)
  {
    const driverId = req.params.id;// to access the id inside the request url
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id:driverId},driverProps).then(()=>driver.findById({_id:driverId}))
    .then(driver=>res.send(driver))
    .catch(next)
  },

  delete(req,res,next)
  {
    const driverId = req.params.id;// to access the id inside the request url
    Driver.findByIdAndRemove({ _id:driverId})
    .then(driver =>res.status(204).send(driver))
    .catch(next)
  }



}
