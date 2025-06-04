document.addEventListener("DOMContentLoaded", function () {
  const produkContainer = document.getElementById("produkContainer");

  // Ambil keyword pencarian dari localStorage
  const keyword = localStorage.getItem("searchKeyword")?.toLowerCase() || "";

  // Ambil semua data produk dari localStorage
  const produkList = JSON.parse(localStorage.getItem("produk")) || [];

  // Filter produk berdasarkan nama atau kategori yang mengandung keyword
  const hasilFilter = produkList.filter(
    (item) =>
      item.nama.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword)
  );

  // console.log(hasilFilter);
  
  // Jika tidak ada hasil yang cocok, tampilkan pesan
  if (hasilFilter.length === 0) {
    produkContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">Produk tidak ditemukan untuk keyword: <strong>${keyword}</strong></p>
      </div>
    `;
    return;
  }
  
  // Tampilkan setiap produk yang cocok dalam elemen grid Bootstrap
  hasilFilter.forEach((produk) => {
    // console.log(produk);
    
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    // Buat elemen kartu produk
    col.innerHTML = `
      <div class="card produk-card shadow-sm">
        <img src="${produk.gambar.replace(
          / /g,
          "%20"
        )}" class="card-img-top" alt="${produk.nama}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${produk.nama}</h5>
          <p class="card-text text-muted">${produk.kategori}</p>
          <p class="card-text fw-bold">${produk.harga}</p>
          <button class="btn btn-danger mt-auto btn-beli"
            data-nama="${produk.nama}"
            data-harga="${produk.harga}"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    `;

    // Tambahkan kartu ke dalam container
    produkContainer.appendChild(col);
  });

  // Tambahkan event listener untuk tombol "Beli Sekarang"
  produkContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-beli")) {
      // Cek apakah user sudah login
      const user = JSON.parse(localStorage.getItem("currentUser"));
      
      if (!user) {
        alert("Silakan login terlebih dahulu untuk membeli produk.");
        window.location.href = "login.html"; // arahkan ke halaman login
        return;
      }

      // Ambil data produk dari tombol
      const nama = e.target.dataset.nama;
      const hargaStr = e.target.dataset.harga;
      const harga = parseInt(hargaStr.replace(/[^0-9]/g, "")); // Hapus Rp dan titik
      const gambar = produkList.find((p) => p.nama === nama)?.gambar || "";

      const item = { nama, harga, jumlah: 1, gambar };

      // Ambil keranjang dari localStorage, atau buat baru jika belum ada
      let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

      // Cek apakah produk sudah ada di keranjang
      const existing = keranjang.find((p) => p.nama === nama);
      if (existing) {
        existing.jumlah += 1; // Tambah jumlah jika sudah ada
      } else {
        keranjang.push(item); // Tambahkan produk baru ke keranjang
      }

      // Simpan kembali ke localStorage
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
      alert(`${nama} berhasil ditambahkan ke keranjang.`);
    }
  });
});
