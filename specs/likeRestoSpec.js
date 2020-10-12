import * as TestFactories from './Helpers/testFactories';
import RestoIDB from '../src/scripts/Data/IndexedDB';

describe('Liking A Resto', () => {
  const stringID = 'TestWithKarma';
  const addLoveButtonContainer = () => {
    document.body.innerHTML = '<div class="love-button" aria-label="Love this Resto"> </div>';
  };
  beforeEach(() => { addLoveButtonContainer(); });

  it('should show the love button when the resto has not been loved before', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    expect(document.querySelector('[aria-label="Love this Resto"]')).toBeTruthy();
  });

  it('should not show the unlove button when the resto has not been loved before', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    expect(document.querySelector('[aria-label="UnLove this Resto"]')).toBeFalsy();
  });

  it('should be able to love the resto', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    document.querySelector('.love-button').dispatchEvent(new Event('click'));
    const resto = await RestoIDB.Resto.RestoDetails(stringID);
    expect(resto).toEqual({ id: stringID });
    RestoIDB.Resto.deleteResto(stringID);
  });

  it('should not add a resto again when its already loved', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    await RestoIDB.Resto.addResto({ id: stringID });
    document.querySelector('.love-button').dispatchEvent(new Event('click'));
    expect(await RestoIDB.Resto.getAllResto()).toEqual([{ id: stringID }]);
    RestoIDB.Resto.deleteResto(stringID);
  });

  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({});
    document.querySelector('.love-button').dispatchEvent(new Event('click'));
    expect(await RestoIDB.Resto.getAllResto()).toEqual([]);
  });
});
