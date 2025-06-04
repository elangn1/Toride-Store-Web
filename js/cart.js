document.addEventListener("DOMContentLoaded", function () {
  const cartBody = document.getElementById("cartBody");
  const cartTitle = document.getElementById("cartTitle");
  const totalHargaElem = document.getElementById("totalHarga");
  const totalSection = document.getElementById("totalSection");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCart");
  const cartTableSection = document.getElementById("cartTableSection");
  const actionButtons = document.getElementById("actionButtons");
  const cartEmptyMessage = document.getElementById("cartEmptyMessage");

  function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
  }

  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  function renderCart() {
    cartBody.innerHTML = "";
    let total = 0;

    if (keranjang.length === 0) {
      cartTitle.style.display = "none";
      cartEmptyMessage.classList.remove("d-none");
      cartTableSection.style.display = "none";
      totalSection.classList.remove("d-flex");
      totalSection.style.display = "none";
      actionButtons.classList.remove("d-flex");
      actionButtons.style.display = "none";
      document.body.classList.add("d-flex", "justify-content-center", "align-items-center", "min-vh-100");
      return;
    }

    cartTitle.style.display = "block";
    cartEmptyMessage.classList.add("d-none");
    cartTableSection.style.display = "block";
    totalSection.style.display = "flex";
    actionButtons.style.display = "flex";
    document.body.classList.remove("d-flex", "justify-content-center", "align-items-center", "min-vh-100");

    for (let i = 0; i < keranjang.length; i++) {
      const item = keranjang[i];
      const subtotal = item.harga * item.jumlah;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger btn-kurang" data-index="${i}">-</button>
          <span class="mx-2">${item.jumlah}</span>
          <button class="btn btn-sm btn-outline-success btn-tambah" data-index="${i}">+</button>
        </td>
        <td>${formatRupiah(item.harga)}</td>
        <td>${formatRupiah(subtotal)}</td>
        <td>
          <button class="btn btn-sm btn-danger btn-hapus" data-index="${i}">Hapus Semua</button>
        </td>
      `;
      cartBody.appendChild(row);
    }

    totalHargaElem.textContent = formatRupiah(total);
  }

  // Semua event dalam satu listener
  cartBody.addEventListener("click", function (e) {
    const index = parseInt(e.target.dataset.index);
    if (isNaN(index)) return;

    if (e.target.classList.contains("btn-kurang")) {
      keranjang[index].jumlah = Math.max(1, keranjang[index].jumlah - 1);
    } else if (e.target.classList.contains("btn-tambah")) {
      keranjang[index].jumlah += 1;
    } else if (e.target.classList.contains("btn-hapus")) {
      keranjang.splice(index, 1);
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    renderCart();
  });

  // Tombol kosongkan semua
  clearCartBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
      localStorage.removeItem("keranjang");
      keranjang = [];
      renderCart();
    }
  });

  // Tombol checkout
  checkoutBtn.addEventListener("click", () => {
    alert("Terima kasih! Pembelian Anda berhasil.");
    localStorage.removeItem("keranjang");
    keranjang = [];
    renderCart();
  });

  renderCart();
});
