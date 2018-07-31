const assert = require('assert')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Driver = mongoose.model('driver')



describe('Express test',()=>{


  it("handle GET request",(done)=>{
    request(app).get('/api').end((err,res)=>{// err does not talk about error code but it just talks
      //about everything that have to go wrong with the request.
          assert(res.body.hi === 'there')
          done();
    })
  })

    it('Post to /api/drivers create new Driver',(done)=>{
      Driver.count().then(count=>{
        request(app)
        .post('/api/drivers')
        .send({'email':'test@test.com'})
        .end(()=>{
        Driver.count().then(newcount=>{
        assert(count+1===newcount)
          done()
        })
      })

    })
    })

    it('Put to API',(done)=>{
      const driver = new Driver({email:'t1@t1.com'})

      driver.save()
      .then(()=>{
        request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({driving:true})
        .end(()=>{
        Driver.findOne({email:'t1@t1.com'})
        .then((driver1)=>{

          assert(driver1.driving === true)
          done();
        }).catch(err=>console.log(err))
      })
    }).catch(error=>console.log(error))
})

it('Delete to API',(done)=>{
  const driver = new Driver({email:'t2@t2.com'})
  driver.save().then(()=>{
    request(app).delete(`/api/drivers/${driver._id}`)
    .end(()=>{
      Driver.findOne({email:'t2@t2.com'})
      .then((driver)=>{
        assert(driver === null)
        done();
      })
    })
  })
})

it('Get to /api/drivers finds drivers',(done)=>{
  const seattleDriver = new Driver({
    email:'seattle@test.com',
    geometry:{ type:'Point', coordinates: [-122.4759902,47.6147628]},
  });

  const miamiDriver = new Driver({
    email:'miami@test.com',
    geometry:{ type:'Point', coordinates: [-80.253,25.791]},
  });

  Promise.all([seattleDriver.save(), miamiDriver.save()])
  .then(()=>{
    request(app)
    .get('/api/drivers?lng=-80.253&lat=25.791')
    .end((err,response)=>{
      console.log(response.body)
      done();
    })
  })
})

})
