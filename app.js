// ===== KONSTANTA =====
const STORAGE_KEY = "todos";

// ===== STATE =====
let todos = muatDariStorage();

// ===== DOM ELEMENTS =====
const form = document.querySelector("#form-todo");
const input = document.querySelector("#input-todo");
const list = document.querySelector("#list-todo");
const stats = document.querySelector("#stats");

// ===== FUNCTIONS =====

// Membaca data dari localStorage. Jika kosong atau rusak, kembalikan array kosong.
function muatDariStorage() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

// Menyimpan state ke localStorage (dalam bentuk teks JSON).
function simpan() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Gagal menyimpan ke localStorage:", error);
  }
}

// Membuat satu elemen <li> untuk satu tugas.
// Teks tugas dipasang dengan textContent (bukan innerHTML) agar tag HTML
// yang diketik pengguna tidak dijalankan oleh browser.
function buatItem(todo) {
  const li = document.createElement("li");
  if (todo.selesai) li.classList.add("selesai");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.selesai;
  checkbox.dataset.id = todo.id;
  checkbox.setAttribute("aria-label", "Tandai selesai: " + todo.teks);

  const teks = document.createElement("span");
  teks.className = "teks";
  teks.textContent = todo.teks;

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = "hapus";
  tombolHapus.dataset.id = todo.id;
  tombolHapus.textContent = "Hapus";
  tombolHapus.setAttribute("aria-label", "Hapus tugas: " + todo.teks);

  li.append(checkbox, teks, tombolHapus);
  return li;
}

// Menggambar ulang seluruh daftar berdasarkan state.
function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const kosong = document.createElement("li");
    kosong.className = "kosong";
    kosong.textContent = "Belum ada tugas. Tambahkan!";
    list.appendChild(kosong);
    stats.textContent = "0 tugas belum selesai";
    return;
  }

  todos.forEach((todo) => {
    list.appendChild(buatItem(todo));
  });

  const belum = todos.filter((t) => !t.selesai).length;
  stats.textContent = `${belum} tugas belum selesai`;
}

function tambahTodo(teks) {
  todos.push({
    id: Date.now(),
    teks: teks.trim(),
    selesai: false,
  });
  simpan();
  render();
}

function hapusTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  simpan();
  render();
}

function toggleSelesai(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.selesai = !todo.selesai;
    simpan();
    render();
  }
}

// ===== EVENTS =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    tambahTodo(input.value);
    input.value = "";
    input.focus();
  }
});

// Event delegation: satu listener pada <ul> untuk semua item yang dibuat dinamis.
list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    toggleSelesai(Number(e.target.dataset.id));
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("hapus")) {
    hapusTodo(Number(e.target.dataset.id));
  }
});

// ===== INIT =====
render();
