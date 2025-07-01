function setAktivitas(tanggal = null, jam = null, keterangan){
  if(!tanggal){
    tanggal = new Date().toISOString().split('T')[0];
  }
  var jam = jam || {
    "jam_mulai" : "07",
    "jam_selesai" : "07",
    "menit_mulai" : "15",
    "menit_selesai" : "45"
  };
  var kode_aktifitas = "GLOBAL0203";
  var volume = "1";
  var sasaran_kerja_id = "323562";
  var jenis = "kinerja";
  
  fetch("https://erk.pontianak.go.id/input/isiaktifitas", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": "3FB8oCcJKInxU2ownIZ4JHshep0TTYLjfY1YsUy2",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://erk.pontianak.go.id/input/aktivitas",
    "body": `tanggal=${encodeURIComponent(tanggal)}&` + 
            `kode_aktifitas=${encodeURIComponent(kode_aktifitas)}&` +
            `volume=${encodeURIComponent(volume)}&` +
            `keterangan=${encodeURIComponent(keterangan)}&` +
            `sasaran_kerja_id=${encodeURIComponent(sasaran_kerja_id)}&` +
            `jenis=${encodeURIComponent(jenis)}&` +
            `jam_mulai=${encodeURIComponent(jam.jam_mulai)}&` +
            `menit_mulai=${encodeURIComponent(jam.menit_mulai)}&` +
            `jam_selesai=${encodeURIComponent(jam.jam_selesai)}&` +
            `menit_selesai=${encodeURIComponent(jam.menit_selesai)}&` +
            `id_input=${encodeURIComponent("")}`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }) .then((response) => response.text())
  .then((text) => {
    alert(text);
  });
}
function promptAktivitas() {
  var defaultDate = new Date().toISOString().split('T')[0];
  var defaultJam = {
    "jam_mulai": "07",
    "jam_selesai": "07", 
    "menit_mulai": "15",
    "menit_selesai": "45"
  };
  var defaultKeterangan = "Melakukan pengecekan berkala terhadap sistem dan data pada aplikasi e-Lapor.";

  var tanggal = prompt("Masukkan tanggal (format: YYYY-MM-DD)", defaultDate);
  if (!tanggal) return;

  const jamMulaiSelesai = prompt("Masukkan jam mulai dan jam selesai (contoh: 07:15-07:45 jika 30 menit)", defaultJam.jam_mulai + ":" + defaultJam.menit_mulai + "-" + defaultJam.jam_selesai + ":" + defaultJam.menit_selesai);
  if (!jamMulaiSelesai) return;
  const jamMulaiSelesaiArray = jamMulaiSelesai.split("-");
  const jamMulai = jamMulaiSelesaiArray[0].split(":")[0];
  const menitMulai = jamMulaiSelesaiArray[0].split(":")[1];
  const jamSelesai = jamMulaiSelesaiArray[1].split(":")[0];
  const menitSelesai = jamMulaiSelesaiArray[1].split(":")[1];

  var keterangan = prompt("Masukkan keterangan aktivitas", defaultKeterangan);
  if (!keterangan) return;

  var jam = {
    "jam_mulai": jamMulai,
    "jam_selesai": jamSelesai,
    "menit_mulai": menitMulai,
    "menit_selesai": menitSelesai
  };

  setAktivitas(tanggal, jam, keterangan);
}

promptAktivitas();

