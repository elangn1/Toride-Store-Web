import USERS from './users.js';

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

function login(loggedIn) {
  loggedIn.preventDefault();
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  // validasi input, apakah data sudah ada di local storage
  let storedUsers = JSON.parse(localStorage.getItem('USERS'));
  if (!storedUsers) {
    storedUsers = USERS;
  }

  // mencari user yang sesuai dengan input
  let onlineUser = false;
  for (let i = 0; i < storedUsers.length; i++) {  // loop local storage
    const { email, username, password, namaLengkap } = storedUsers[i]; 
    if (emailInput === email && passwordInput === password) {   // jika username dan password sesuai
      onlineUser = true;  // maka onlineUser menjadi true  
      localStorage.setItem("loginStatus", JSON.stringify(true));      // set login status dengan true, karena bolean maka dirubah menjadi string
      localStorage.setItem("username", username); 
      localStorage.setItem("namaLengkap", namaLengkap); 
      localStorage.setItem("currentUser", JSON.stringify(storedUsers[i]));
      
      break;
    }
  }
  const messageBox = document.getElementById('message-box')
  // alert apakah login berhasil atau tidak
//   if (onlineUser) {   // true
//     messageBox.innerText = 'Login berhasil! Redirecting...'
//     messageBox.style.color = 'green'
//     setTimeout(() => {
//         location.href = '../index.html'; // Redirect ke halaman utama setelah login
//     }, 1000)
//   } else {
//     messageBox.innerText = 'Email atau password anda salah!'
//     messageBox.style.color = 'red'
//     }
    if (onlineUser) {
        alert('Login berhasil!');
        setTimeout(() => {
        location.href = 'index.html'; // Redirect ke halaman utama setelah login
        });
    } else {
        alert('Email atau password anda salah!');
    }

}

function signUp() {
  location.href = '../register.html'   // signup\index.html
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}

window.signUp  = signUp;
window.goBack  = goBack;