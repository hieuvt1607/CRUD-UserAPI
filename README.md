#### Introduction
This project is to provide RESTFUL APIs for CRUD User

It is using:
* ExpressJS, NodeJS, with Sequelize ORM


#### Setup Run Local
* Install package:   
```bash
npm install
```

* Setup database connection in config/config.json and src/config/config.js

#### Run migration
* Make sure you install globally sequelize-cli: https://www.npmjs.com/package/sequelize-cli
```bash
sequelize db:migrate
```
* Now you can start server
```bash
npm run dev
```

#### Project Structure
* `src` folder contains all logic code
* `migrations` folder contains migrations
* `src/users` folder contains logic code of CRUD user APIs
