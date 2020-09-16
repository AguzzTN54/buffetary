import jamBuka from './JamBuka';

const Jadwal = {
  print() {
    const jadwalBuka = jamBuka();
    this._jadwal = jadwalBuka;
    let semuaJadwal = '';
    jadwalBuka.forEach((schedule) => {
      semuaJadwal += this.jamKerjaList(schedule);
    });
    return {
      hariIni: this.todaySchedule(),
      semuaJadwal,
    };
  },

  todaySchedule() {
    const buka = this._jadwal;
    const today = new Date();
    const day = today.getDay();
    const jam = buka[day].jadwal;
    const isTutup = buka[day].status === 'tutup'
      || parseInt(jam.buka, 10) > today.getHours()
      || parseInt(jam.tutup, 10) < today.getHours();
    let jamKerja = `${jam.buka} - ${jam.tutup}`;
    jamKerja = jamKerja.replace('00:00 - 24:00', 'Buka 24jam');
    return isTutup ? 'Tutup' : jamKerja;
  },

  jamKerjaList(schedule) {
    const waktu = schedule.jadwal;
    const waktuBuka = waktu.buka.replace(/-/g, '');
    const waktuTutup = waktu.tutup.replace(/-/g, '');
    const jamKerja = `${waktuBuka} - ${waktuTutup}`;
    const isNoSchedule = (jamKerja === ' - ');
    return `<tr>
      <td> ${schedule.hari} </td>
      <td> ${isNoSchedule ? 'Tutup' : jamKerja} </td>
    </tr>`;
  },
};

export default Jadwal;
