const assert = require('assert')
const request = require('supertet')
const app = require('../../app')
const mongoose = require('mongoose')
const Driver = mongoose.model('driver')

describe('Drivers Controller',()=>{

  it('Post to /api/drivers create new Driver',(done)=>{
    const c = Driver.count().then(count={
      request(app)
      .post('/api/drivers')
      .send({'email':'test@test.com'})
      .end((err,res)=>{
      Driver.count().then(count=>{
        assert(c+1===count)
        done()
      })
    })

  }).catch(error=>console.log(error))
  })

})
