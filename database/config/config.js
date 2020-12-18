module.exports = {
  host: 'ec2-54-160-133-106.compute-1.amazonaws.com',
  database: 'df7rdv2khvp857',
  username: 'gzofxwmmfqovuh',
  password: '37924cb9f7df52ff1e73eaa2502f334c9bad7746aa149c59149c35e968f48ff1',
  port: 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  ssl: true
}
