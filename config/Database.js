import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// Pastikan semua variabel environment terisi
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('❌ Missing required database environment variables.');
}

// Buat koneksi Sequelize dengan env yang dinamis
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS ?? '', {
  host: DB_HOST,
  port: DB_PORT || 3306, // Default ke 3306 jika tidak ada di env
  dialect: 'mysql',
  logging: false, // Matikan logging query SQL (bisa diaktifkan jika debugging)
});

// Coba koneksi ke database
(async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error?.message);
    process.exit(1); // Hentikan aplikasi jika tidak bisa konek
  }
})();

export default db;
