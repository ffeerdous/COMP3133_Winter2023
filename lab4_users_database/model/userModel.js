const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  address: {
    street: {
        type: String,
        required: true,
      },
    suite: {
        type: String,
        required: true,
      },
    city: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]*$/,
      },
    zipcode: {
        type: String,
        required: true,
        match: /^\d{5}-\d{4}$/,
      },
    geo: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        }
    }
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{1}-\d{3}-\d{3}-\d{4}$/,
  },
  website: {
    type: String,
    required: true,
    match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  },
  company: {
    name: {
        type: String,
    },
    catchPhrase: {
        type: String,
    },
    bs: {
        type: String,
    }
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;