const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');


exports.getRandomUUID = () => {
    return uuidv4();
}