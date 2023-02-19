const { string } = require("joi");
const mongoose = require ("mongoose");
const connectionParams = require("../config/connection");

async function connectToMongoDB(){

    await mongoose.connect(connectionParams(),{ useNewUrlParser: true });
    console.log("DB Connection successful");
}

try{
    connectToMongoDB();
}

catch (error){
    console.log("Error"+error);
}

const schema = mongoose.Schema;
const genreSchema = new schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    category : {
        type: String,
        required: true
    }
});
const genreModel = mongoose.model("Genre",genreSchema);

module.exports = genreModel;
