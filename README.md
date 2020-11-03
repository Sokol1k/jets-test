# Jest-test

### Installation

1. Copy `.env` file
```sh
$ cp .env.dist .env
```
2. Configure `default.json` to send message to mail
```sh
"mail": {
  "service": "gmail",
  "auth": {
    "user": "your_gmail@gmail.com",
    "pass": "your_password"
  }
}
```
3. Run `docker-compose.yml`
```sh
$ sudo docker-compose up
```
4. Run project
```sh
$ npm run start
```

### Test

For testing purposes, follow steps 1-3 from the **Installation** section. And after that do next step
```sh
$ npm run test
```