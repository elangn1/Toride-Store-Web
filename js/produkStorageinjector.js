const produk = [
  {
    nama: "Sepatu Lari",
    kategori: "sepatu",
    harga: "Rp750.000",
    gambar: "./img/Sepatu lari-864481836-2048x2048.jpg",
  },
  {
    nama: "Sepatu Basket",
    kategori: "Sepatu",
    harga: "Rp3000.000",
    gambar: "./img/Sepatu basket-1411635454-2048x2048.jpg",
  },
  {
    nama: "Sepatu Sepak Bola",
    kategori: "sepatu",
    harga: "Rp1.600.000",
    gambar: "./img/Sepatu sepak bola-182780951-1024x1024.jpg",
  },
  {
    nama: "Set Training Hitam",
    kategori: "set baju & celana",
    harga: "Rp450.000",
    gambar: "./img/Set training hitam.jpg",
  },
  {
    nama: "Set Sepak Bola",
    kategori: "set baju & celana",
    harga: "Rp300.000",
    gambar: "./img/Set baju bola.jpg",
  },
  {
    nama: "Set Bulu Tangkis",
    kategori: "set baju & celana",
    harga: "Rp300.000",
    gambar: "./img/Set baju bulu tangkis.webp",
  },
  {
    nama: "Raket Bulu Tangkis",
    kategori: "alat olahraga",
    harga: "Rp350.000",
    gambar: "./img/Raket bulu tangkis.jpg",
  },
  {
    nama: "Tongkat Golf",
    kategori: "alat olahraga",
    harga: "Rp1.200.000",
    gambar: "./img/Tongkat golf.jpg",
  },
  {
    nama: "Raket Tenis",
    kategori: "alat olahraga",
    harga: "Rp500.000",
    gambar: "./img/Raket Tenis.jpg",
  },
  // dan seterusnya...
];

localStorage.setItem("produk", JSON.stringify(produk));
