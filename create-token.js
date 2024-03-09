const jwt = require('jsonwebtoken')
const payload = { user_id: 0 }
const key = process.env.JWT_SECRET_KEY

console.log(jwt.sign(payload, key, { noTimestamp: true }))
