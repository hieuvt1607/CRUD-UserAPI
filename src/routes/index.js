const usersApiRouter = require('../users/index')

const routerManager = (app) => {
    usersApiRouter(app);
};

module.exports = routerManager;
