const mongoose = require('mongoose');

const privatemessageSchema = new mongoose.Schema({
    from_user:{
        type: String
    },
    to_user: {
        type: String
    },
    message: {
        type: String,
    },
    date_sent: {
        type: Date
    },
});

module.exports = mongoose.model("privateMessages", privatemessageSchema)