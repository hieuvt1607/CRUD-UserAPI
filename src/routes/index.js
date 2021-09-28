const usersApiRouter = require('./userRoutes')

const routerManager = (app) => {
    usersApiRouter(app);
};

module.exports = routerManager;
