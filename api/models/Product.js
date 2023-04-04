const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: {
        type: String,
        max: 20,
        required: true
    },
    description :{
        type: String,
        max : 200,
    },
    price: {
        type: Number,
        default: 0
    },
    count : {
       type : Number,
       default : 0
    },
    available :{
        type : Boolean,
        default : true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);