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
4. Install packages
```sh
$ npm install
```
5. Run migrations for database
```sh
$ npx sequelize-cli db:migrate
```
6. Run project
```sh
$ npm run start
```

### Test

For testing purposes, follow steps 1-5 from the **Installation** section. And after that do next step
```sh
$ npm run test
```