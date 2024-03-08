const process = require('process')
const jwt = require('jsonwebtoken')
const express = require('express')
const svgCaptcha = require('svg-captcha')
const { v4: uuidv4 } = require('uuid')

// environment
const port = process.env.PORT || 3000
const secretKey = process.env.SECRET_KEY

const app = express()
const keyMap = {}

app.use(express.json())

const checkAuth = (authorization) => {
	if (!authorization) throw new Error('Missing Authorization header!')
	if (Array.isArray(authorization)) throw new Error('Which Authorization header?')
	if (!authorization.startsWith('Bearer '))
		throw new Error('Invalid Authorization header format!')

	const token = authorization.split(' ')[1]
	// will throw if invalid token
	const payload = jwt.verify(token, secretKey)

	// add more conditions here if you need
	// console.log('payload', payload)
	return true
}

app.get('/api/captcha/get', (req, res) => {
	try {
		checkAuth(req.headers['authorization'])
	} catch (err) {
		res.status(401).json({ code: 1, message: err.message })
		return
	}

	// create captcha
	const result = svgCaptcha.create({ noise: 4, color: true })
	const key = uuidv4()

	// TODO: clear expired
	// console.log(key, result.text)
	keyMap[key] = result.text.toLowerCase()

	// res.type('svg').send(result.data).end()
	res.send({ code: 0, message: 'success', data: { image: result.data, key } })
})

app.post('/api/captcha/check', (req, res) => {
	try {
		checkAuth(req.headers['authorization'])
	} catch (err) {
		res.status(401).json({ code: 1, message: err.message })
		return
	}

	const params = req.body

	if (!params?.key || !params?.code) {
		res.status(400).json({ code: 1, message: 'invalid params' })
		return
	}

	if (keyMap[params.key] && keyMap[params.key] === String(params.code).toLowerCase()) {
		delete keyMap[params.key]
		res.json({ code: 0, message: 'success', data: true })
		return
	}

	res.status(400).json({ code: 1, message: 'invalid captcha code', data: false })
})

app.listen(port, () => {
	console.log(`app start: http://localhost:${port}`)
})
