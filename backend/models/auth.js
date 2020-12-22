const mongoose = require("mongoose");
const auth = new mongoose.Schema({
    username: String,
    authorization: Boolean,
});

module.exports = mongoose.model("Auth", auth);