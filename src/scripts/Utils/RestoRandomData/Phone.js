import randomNumber from './Number';

const getTelp = () => {
  const d4 = () => randomNumber(1111, 9999);
  const d3 = () => randomNumber(111, 999);
  return `0${d3()}-${d3()}-${d4()}`;
};

export default getTelp;
