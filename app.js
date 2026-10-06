// 1. Seleksi elemen 
  const inputTugas   = document.getElementById("input-tugas");
  const btnTambah    = document.getElementById("btn-tambah");
  const peringatan   = document.getElementById("peringatan");
  const daftar       = document.getElementById("daftar");
  const statTotal    = document.getElementById("stat-total");
  const statSelesai  = document.getElementById("stat-selesai");
  const statBelum    = document.getElementById("stat-belum");

  // 2. Variabel penghitung statistik 
  let jumlahTotal = 0;
  let jumlahSelesai = 0;

  // 3. Fungsi memperbarui rekap statistik 
  function perbaruiStatistik() {
    statTotal.innerText = jumlahTotal;
    statSelesai.innerText = jumlahSelesai;
    statBelum.innerText = jumlahTotal - jumlahSelesai;
  }

  // 4. Fungsi menambah tugas
  function tambahTugas() {
    const teks = inputTugas.value;

    // Validasi input kosong
    if (teks.trim() === "") {
      peringatan.innerText = "Tugas tidak boleh kosong. Tulis sesuatu terlebih dahulu.";
      inputTugas.classList.add("invalid");
      return;
    }

    peringatan.innerText = "";
    inputTugas.classList.remove("invalid");

    // Buat elemen dinamis
    const item = document.createElement("li");
    item.classList.add("item");

    const teksTugas = document.createElement("span");
    teksTugas.classList.add("teks");
    teksTugas.innerText = teks;

    const btnHapus = document.createElement("button");
    btnHapus.classList.add("btn-hapus");
    btnHapus.innerText = "Hapus";

    item.appendChild(teksTugas);
    item.appendChild(btnHapus);
    daftar.appendChild(item);

    jumlahTotal++;

    // Status selesai milik tugas ini
    let sudahSelesai = false;

    // Tandai selesai (class CSS "completed")
    teksTugas.addEventListener("click", function () {
      item.classList.toggle("completed");

      if (sudahSelesai) {
        sudahSelesai = false;
        jumlahSelesai--;
      } else {
        sudahSelesai = true;
        jumlahSelesai++;
      }
      perbaruiStatistik();
    });

    // Hapus tugas menggunakan remove()
    btnHapus.addEventListener("click", function () {
      if (sudahSelesai) {
        jumlahSelesai--;
      }
      jumlahTotal--;
      item.remove();
      perbaruiStatistik();
    });

    inputTugas.value = "";
    perbaruiStatistik();
  }

  // 5. Event listener
  btnTambah.addEventListener("click", tambahTugas);

  inputTugas.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      tambahTugas();
    }
  });

  perbaruiStatistik();