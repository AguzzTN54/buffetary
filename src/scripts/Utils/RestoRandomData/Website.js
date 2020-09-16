import randomNumber from './Number';

const chooseDomain = (user) => {
  const domain = ['.com', '.net', '.xyz', '.id', '.co.id'];
  const index = parseInt(randomNumber(0, domain.length - 1), 10);
  return user + domain[index];
};

const getSite = (nama) => {
  const split = nama.toLowerCase().split(' ');
  const rand = () => parseInt(randomNumber(0, split.length - 1), 10);
  let user = nama.toLowerCase().replace(/ /g, '');
  if (split.length > 2) user = split[rand()] + split[rand()];
  return chooseDomain(user);
};

export default getSite;
