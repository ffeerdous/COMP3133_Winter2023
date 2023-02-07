const mongoose = require('mongoose');
const moment = require('moment');

const groupmessageSchema = new mongoose.Schema({
    from_user:{
        type: String
    },
    room: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date
    },
});

const Message = mongoose.model("groupMessages", groupmessageSchema)

function formatMessage(username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    };
}
  
async function saveMessage(username, text) {
    try {
      const message = new Message(formatMessage(username, text));
      await message.save();
      return message;
    } catch (err) {
      console.error(err);
    }
}

module.exports = {formatMessage, saveMessage}