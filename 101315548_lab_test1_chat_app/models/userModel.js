const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        maxlength: 100,
        unique: true,
        require: true,
        lowercase: true
    },
    firstname: {
        type: String,
        maxlength: 50

    },
    lastname: {
        type: String,
        maxlength: 50

    },
    room: {
        type: String
    },
    createon: {
        type: Date
    },
});

const User = mongoose.model("users", userSchema);

function joinChat(username, firstname, lastname, room){
    const user = new User(id, username, firstname, lastname, room)
    return user
}

async function getUser(id) {
    const user = await User.findOne({ id: id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

async function userLeave(id) {
    const result = await User.deleteOne({ id: id });
    if (result.deletedCount === 1) {
        return result;
    } else {
        throw new Error('User not found');
    }
}

async function getRooms(room) {
    try {
        const users = await User.find({ room });
        return users;
    } catch (err) {
        console.error(err);
        return [];
    }
}



module.exports = {joinChat, getUser, userLeave, getRooms};