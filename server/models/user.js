const _ = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'is not an email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  }
})

UserSchema.methods.toJSON = function() {
  let user = this
  let userObj = user.toObject()

  return _.pick(userObj, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = "auth"
  const token = jwt.sign({ _id: user.id.toHexString(), access }, '1234').toString()

  user.tokens.push({ access, token })

  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.findByToken = function(token) {

}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
