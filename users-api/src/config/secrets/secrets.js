const env = process.env;

export const MONGO_DB_URL = env.MONGO_DB_URL ? env.MONGO_DB_URL :
"mongodb+srv://rohantunes35:roberto123@developmentroberto.shceiam.mongodb.net/sales_api";

export const API_SECRET = env.API_SECRET ? env.API_SECRET :
"bW9uZGlzdHJpYnVpZG9yYQ==";

export const RABBIT_MQ_URL = env.RABBIT_MQ_URL ? env.RABBIT_MQ_URL :
"amqp://127.0.0.1:5672";

