const { default: mongoose } = require("mongoose");

const mongoOptions = {
    autoIndex: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
};

const databaseURI = process.env.MONGO_URI;

const connect = () => mongoose.createConnection(databaseURI, mongoOptions);

const connectToMongoDB = () => {
    const db = connect();
    console.log("Connecting to DB..............");

    db.on('error', (err) => {
        console.log(`Error connecting: ${err}`);
        process.exit(0);
    });

    db.once('open', () => {
        console.log("Successfully connected to the database!");
    });

    return db;
};

exports.connectToMongoDB = connectToMongoDB;
