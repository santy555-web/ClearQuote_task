var mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    id: {
        type: String
    },
    name: {
        type: String
    },
    gmail: {
        type: String
    },
    empaddress: {
        type: String
    }
});