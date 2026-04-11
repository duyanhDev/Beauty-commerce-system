export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    port: parseInt(process.env.DB_PORT || '3306', 10),
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRE,
  },
});
