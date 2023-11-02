import User from "../models/UserModel.js"; // Pastikan Anda mengimpor model User dari file yang benar
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data pengguna.' });
  }
};

/*
//USE EXPERT NODE JS
export const getUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pertimbangkan untuk melakukan validasi input di sini

    // Cari pengguna berdasarkan alamat email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Pastikan bahwa kata sandi cocok dengan kata sandi di database
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kata sandi salah." });
    }

    // Generate token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "rahasia-kita-bersama",
      { expiresIn: "24h" }
    );

    // Kirim token sebagai respons
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan dalam proses login." });
  }
};
*/

export const createUser = async (req, res) => {
  try {
    // Ambil kata sandi dari permintaan
    const { password, ...otherUserData } = req.body;

    // Hash kata sandi menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Angka 10 adalah jumlah salting rounds (semakin tinggi, semakin aman, tetapi lebih lambat)

    // Simpan kata sandi yang di-hash bersama dengan data pengguna lainnya
    await User.create({ ...otherUserData, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User Created",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    // Hash password sebelum update
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
};
