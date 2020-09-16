import randomNumber from './Number';
import getSite from './Website';

const choosehDomain = (user, nama) => {
  const domain = ['gmail.com', 'yahoo.com', 'ymail.com', getSite(nama)];
  const index = parseInt(randomNumber(0, domain.length - 1), 10);
  return `${user}@${domain[index]}`;
};

const getEmail = (nama) => {
  const split = nama.toLowerCase().split(' ');
  const rand = () => parseInt(randomNumber(0, split.length - 1), 10);
  let user = nama.toLowerCase().replace(/ /g, '');
  if (split.length > 3) user = split[rand()] + split[rand()] + split[rand()];
  return choosehDomain(user, nama);
};

export default getEmail;
