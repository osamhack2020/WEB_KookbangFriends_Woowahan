module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "db"),
        srv: env.bool("DATABASE_SRV", false),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "kookbangfriendsosam"),
        timezone: "Asia/Seoul",
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
