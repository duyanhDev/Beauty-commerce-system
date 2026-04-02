export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    port: parseInt(process.env.DB_PORT || '3306', 10),
    url: process.env.MYSQL_PUBLIC_URL,
  },
});
