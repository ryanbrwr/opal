const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    groupID: String,
    keywordList: [{
        keyword: String,
        channelIDList: Array
    }]
})

module.exports = mongoose.model('group ', groupSchema)