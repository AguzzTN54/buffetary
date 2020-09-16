const defaultMessage = 'Terjadi Kesalahan, Tidak dapat Memuat Data';

const ErrorPageTpl = {
  failedLoad(message) {
    const printMessage = message || defaultMessage;
    return `
      <figure>
        <img src="./images/failed-to-load.svg" alt="Failed to load resources" />
      </figure>
      <figcaption>
        <p> ${printMessage}</p>
        <button class="refresh mtop-5 mbottom-5"> Refresh</button>
      </figcaption>
    `;
  },

  notFound() {
    return `
      <figure>
        <img src="./images/route-not-found.svg" alt="No Route Found for this Page" />
      </figure>
      <figcaption>
        <h1> 404 </h1>
        <p> Tidak ada data untuk Halaman Ini <br/> Pastikan kamu telah mengakses alamat dengan benar </p>
        <a href="#/" class="refresh mtop-5 mbottom-5"> Kembali Ke Home </a>
      </figcaption>
    `;
  },
};

export default ErrorPageTpl;
