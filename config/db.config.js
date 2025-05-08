const environment = process.env.NODE_ENV || 'development';
export default {
  url: environment === 'production' ? process.env.MONGO_DB_URL : process.env.MONGO_DB_LOCAL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};
