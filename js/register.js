import USERS from './users.js';

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', register)

function register(createUser) {
  createUser.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const namaLengkap = document.getElementById('namaLengkap').value;
  const confirmPassword = document.getElementById('confirm').value;
  if (password !== confirmPassword) {
    alert('Password anda tidak cocok!')
    return
  }
  // validasi input, apakah data sudah ada di local storage
  let storedUsers = JSON.parse(localStorage.getItem('USERS'));
  if (!storedUsers) {
    storedUsers = USERS;
  }

  // password minimal 8 karakter
  if (password.length < 8) {
    alert('Password minimal 8 karakter!');
    return;
  }

  // validasi apakah email dan username sudah terdaftar
  for (let i = 0; i < storedUsers.length; i++) {
    if (storedUsers[i].email === email) {
      alert("Email sudah digunakan");
      return;
    }
    if (storedUsers[i].username === username) {
      alert("Username sudah digunakan");
      return;
    }
  }

  // Membuat Id secara dinamis
  let id = 1;
  if (storedUsers.length !== 0) {
  // Ambil id terakhir dari array USERS dan tambahkan 1
    id = storedUsers[storedUsers.length - 1].id + 1;
  }

  // membuat object user baru
  const newUser = {
    id: id,
    email: email,
    username: username,
    password: password,
    namaLengkap: namaLengkap,
  }
  
  // menyinpan user yang telah didaftar ke local storage
  storedUsers.push(newUser);
  localStorage.setItem('USERS', JSON.stringify(storedUsers));
  alert('Akun berhasil dibuat! Silakan login.');
  
  // redirect ke halaman login setelah selesai register
  location.href = 'login.html';
}

function goBack() {
    location.href = '../login';
}

window.register = register;
window.goBack  = goBack;