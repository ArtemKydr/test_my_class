const express = require('express');
const router = express.Router();

class BaseRouter {
    constructor() {
        if (this.constructor === BaseRouter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.router = router;
        this.initRoutes();
    }

    /**
     * Метод для инициализации маршрутов.
     * Должен быть переопределен в дочерних классах.
     */
    initRoutes() {
        throw new Error("Method 'initRoutes()' must be implemented.");
    }

    /**
     * Метод для получения роутера.
     * @returns {express.Router}
     */
    getRouter() {
        return this.router;
    }
}

module.exports = BaseRouter;
