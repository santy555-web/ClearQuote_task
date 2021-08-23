var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String
      },
      gender: {
        type: String
      },
      mobile_no: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String,
      },
      created: {
        type: Date,
        default: Date.now
      }
});