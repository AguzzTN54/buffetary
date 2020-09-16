import randomNumber from './Number';

const hariLibur = (hari, isWeekendOpen) => {
  const libur = (hari === 'Minggu' || hari === 'Sabtu');
  const tidakLibur = false;
  return isWeekendOpen ? tidakLibur : libur;
};

const jamBuka24jam = ({ hari, isWeekendOpen }) => {
  const jamBuka = { buka: '00:00', tutup: '24:00' };
  return hariLibur(hari, isWeekendOpen)
    ? { buka: '-', tutup: '-' }
    : jamBuka;
};

const jamBukaRandom = ({ hari, isWeekendOpen, schedule }) => {
  const { buka, tutup } = schedule;
  return hariLibur(hari, isWeekendOpen)
    ? { buka: '-', tutup: '-' }
    : { buka, tutup };
};

const cekJadwal = ({
  hari, isBuka24jam, isWeekendOpen, schedule,
}) => {
  const jadwal = {
    hari,
    status: hariLibur(hari, isWeekendOpen) ? 'tutup' : 'buka',
    jadwal: isBuka24jam
      ? jamBuka24jam({ hari, isWeekendOpen })
      : jamBukaRandom({ hari, isWeekendOpen, schedule }),
  };
  return jadwal;
};

const jamBuka = () => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const isWeekendOpen = parseInt(randomNumber(0, 1), 10);
  const isBuka24jam = parseInt(randomNumber(0, 1), 10);
  const buka = `0${randomNumber(7, 9)}:00`;
  const tutup = `${(randomNumber(17, 22))}:00`;
  return days.map((hari) => cekJadwal({
    isBuka24jam,
    hari,
    isWeekendOpen,
    schedule: { buka, tutup },
  }));
};

export default jamBuka;
