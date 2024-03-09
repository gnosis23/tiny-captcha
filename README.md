# tiny-captcha
Captcha code service, a demo showcasing the integrated application of express, jwt, and docker.

## Usage

```bash
$ npm i
$ npm start
```

## API

### GET /api/captcha/get

fetch request example

```js
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer YOUR-JWT-TOKEN");

fetch("localhost:3000/api/captcha/get", {
  method: 'GET',
  headers: myHeaders,
})
  .then(response => response.json())
  .then(result => console.log(result))
```

return format

```json
{
	"code": 0,
	"message": "success",
	"data": {
		"image": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" ...></svg>",
		"key": "5f7e2ce9-3348-47a2-a3f9-11eff6ef580b"
	}
}
```

### POST /api/captcha/check

fetch request example

```js
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer YOUR-JWT-TOKEN");
myHeaders.append("Content-Type", "application/json");

var body = JSON.stringify({
  "code": "cu8q",
  "key": "5f7e2ce9-3348-47a2-a3f9-11eff6ef580b"
});

fetch("localhost:3000/api/captcha/check", {
  method: 'POST',
  headers: myHeaders,
  body: body,
})
  .then(response => response.json())
  .then(result => console.log(result));
```

return format

```json
{
	"code": 0,
	"message": "success",
	"data": true
}
```

## Docker

```bash
# build
docker build -t gnosis23/tiny-captcha:v1.0.0 .

# run
docker run --name tiny-captcha -d -p 3000:3000 -e JWT_SECRET_KEY="YOUR_KEY" \
	gnosis23/tiny-captcha:v1.0.0
```

## Generate JWT Token Example

```bash
const jwt = require('jsonwebtoken')
const payload = { user_id: 0 }
const key = process.env.JWT_SECRET_KEY

const token = jwt.sign(payload, key, { noTimestamp: true })
console.log(token)
```
