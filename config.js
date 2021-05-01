require("dotenv").config()

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const dbname = process.env.MONGO_DB;

module.exports = {
    "mongoUrl": `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`,
    "secretKey": process.env.SECRET_KEY
}
