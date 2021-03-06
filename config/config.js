require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": { "rejectUnauthorized": false }
        }
    },
    "test": {
        "username": "postgres",
        "password": "111215",
        "database": "database_test_product",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "use_env_variable": "DATABASE_URL",
        "protocol": "postgres",
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                "rejectUnauthorized": false
            }
        }
    }
}