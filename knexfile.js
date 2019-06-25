// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    username: 'enitefall',
    password: 'negociant',
    connection: {
      database: 'cluckr'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }

};