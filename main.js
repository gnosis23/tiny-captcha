const process = require('process')
const jwt = require('jsonwebtoken')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const secretKey = process.env.SECRET_KEY

const checkAuth = (authorization) => {
	if (!authorization) throw new Error('Missing Authorization header!')
	if (Array.isArray(authorization)) throw new Error('Which Authorization header?')
	if (!authorization.startsWith('Bearer '))
		throw new Error('Invalid Authorization header format!')

	const token = authorization.split(' ')[1]
	// will throw if invalid token
	const payload = jwt.verify(token, secretKey)

	// add more conditions here if you need
	console.log('payload', payload)
	return true
}

app.get('/api/captcha/get', (req, res) => {
	try {
		checkAuth(req.headers['authorization'])
	} catch (err) {
		res.status(401).json({ code: 1, message: err.message })
		return
	}

	res.send({ code: 0, message: 'success', data: { key: 123 } })
})

app.post('/api/captcha/check', (req, res) => {
	try {
		checkAuth(req.headers['authorization'])
	} catch (err) {
		res.status(401).json({ code: 1, message: err.message })
		return
	}

	res.send({ code: 0, message: 'success', data: true })
})

app.listen(port, () => {
	console.log(`Example app start: http://localhost:${port}`)
})
