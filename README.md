# tiny-captcha
Captcha code service, a demo showcasing the integrated application of express, jwt, and docker.

## Docker

```bash
# build
docker build -t gnosis23/tiny-captcha:v1.0.0 .

# run
docker run --name tiny-captcha -d -p 3000:3000 -e JWT_SECRET_KEY="YOUR_KEY" \
	gnosis23/tiny-captcha:v1.0.0
```
