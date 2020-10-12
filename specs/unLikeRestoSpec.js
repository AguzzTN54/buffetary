import RestoIDB from '../src/scripts/Data/IndexedDB';
import * as TestFactories from './Helpers/testFactories';

const addLoveButtonContainer = () => {
  document.body.innerHTML = '<div class="love-button" aria-label="UnLove this Resto"> </div>';
};

describe('Unliking A Resto', () => {
  const stringID = 'TestWithKarma';
  beforeEach(async () => {
    addLoveButtonContainer();
    await RestoIDB.Resto.addResto({ id: stringID });
  });
  afterEach(async () => { await RestoIDB.Resto.deleteResto(stringID); });

  it('should display unlove widget when the resto has been loved', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    expect(document.querySelector('[aria-label="UnLove this Resto"]')).toBeTruthy();
  });

  it('should not display love widget when the resto has been loved', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    expect(document.querySelector('[aria-label="Love this Resto"]')).toBeFalsy();
  });

  it('should be able to remove loved resto from the list', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    document.querySelector('[aria-label="UnLove this Resto"]').dispatchEvent(new Event('click'));
    expect(await RestoIDB.Resto.getAllResto()).toEqual([]);
  });

  it('should not throw error if the unloved resto is not in the list', async () => {
    await TestFactories.createLoveButtonPresenterWithResto({ id: stringID });
    await RestoIDB.Resto.deleteResto(stringID);
    document.querySelector('[aria-label="UnLove this Resto"]').dispatchEvent(new Event('click'));
    expect(await RestoIDB.Resto.getAllResto()).toEqual([]);
  });
});
