document.addEventListener("DOMContentLoaded", function () {
  // Fitur pencarian
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const keyword = searchInput.value.trim().toLowerCase();
    localStorage.setItem("searchKeyword", keyword);
    window.location.href = "produk.html";
  });

  // Cek user login
  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));

  if (loggedInUser) {
    // Sembunyikan tombol Daftar dan Masuk
    const navDaftar = document.getElementById("nav-daftar");
    const navMasuk = document.getElementById("nav-masuk");
    if (navDaftar) navDaftar.style.display = "none";
    if (navMasuk) navMasuk.style.display = "none";

    // Tampilkan nama user dan tombol logout
    const navUser = document.getElementById("nav-user");
    const navLogout = document.getElementById("nav-logout");
    const userFullname = document.getElementById("userFullname");

    if (navUser && navLogout && userFullname) {
      userFullname.textContent = loggedInUser.userFullname;
      navUser.classList.remove("d-none");
      navLogout.classList.remove("d-none");
    }

    // ✅ Tampilkan menu Chart
    const navChart = document.getElementById("nav-chart");
    if (navChart) {
      navChart.classList.remove("d-none");
    }

    // Logout handler
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("namaLengkap");
        localStorage.removeItem("username");
        localStorage.setItem("loginStatus", JSON.stringify(false));
        location.reload();
      });
    }
  }
});

// Fungsi untuk menambahkan item ke keranjang
function tambahKeKeranjang(nama, harga, gambar) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  // Cek apakah produk sudah ada, jika ya, tambahkan quantity
  const index = keranjang.findIndex((item) => item.nama === nama);
  if (index !== -1) {
    keranjang[index].jumlah += 1;
  } else {
    keranjang.push({
      nama: nama,
      harga: parseInt(harga),
      gambar: gambar,
      jumlah: 1,
    });
  }

  // Simpan kembali ke localStorage
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateCartCount();
}

// Fungsi untuk update jumlah badge cart
function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const totalItem = keranjang.reduce((total, item) => total + item.jumlah, 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = totalItem;
  }
}

// Event listener semua tombol beli
// Cek apakah user sudah login
function isUserLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}

// Event listener tombol beli
document.addEventListener("DOMContentLoaded", function () {
  const tombolBeli = document.querySelectorAll(".btn-beli");
  tombolBeli.forEach((button) => {
    button.addEventListener("click", function () {
      if (!isUserLoggedIn()) {
        alert(
          "⚠️ Anda harus login terlebih dahulu untuk menambahkan ke keranjang."
        );
        window.location.href = "./login.html"; // arahkan ke halaman login
        return;
      }

      const nama = this.getAttribute("data-nama");
      const harga = this.getAttribute("data-harga");
      const gambar = this.getAttribute("data-gambar");
      tambahKeKeranjang(nama, harga, gambar);
      alert(`✅ ${nama} ditambahkan ke keranjang.`);
    });
  });

  updateCartCount(); // update badge saat halaman dibuka
});
