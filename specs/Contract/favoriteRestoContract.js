const itActsAsFavoriteRestoModel = (favoriteResto) => {
  const stringID = 'TestWithKarma';

  it('should return the resto that has been added', async () => {
    favoriteResto.addResto({ id: `${stringID}1` });
    favoriteResto.addResto({ id: `${stringID}2` });

    expect(await favoriteResto.getRestoDetail(`${stringID}1`))
      .toEqual({ id: `${stringID}1` });
    expect(await favoriteResto.getRestoDetail(`${stringID}2`))
      .toEqual({ id: `${stringID}2` });
    expect(await favoriteResto.getRestoDetail(`${stringID}3`))
      .toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    favoriteResto.addResto({ aProperty: 'property' });
    expect(await favoriteResto.getAllResto()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteResto.addResto({ id: `${stringID}1` });
    favoriteResto.addResto({ id: `${stringID}2` });

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: `${stringID}1` },
        { id: `${stringID}2` },
      ]);
  });

  it('should remove favorite resto', async () => {
    favoriteResto.addResto({ id: `${stringID}1` });
    favoriteResto.addResto({ id: `${stringID}2` });
    favoriteResto.addResto({ id: `${stringID}3` });

    await favoriteResto.deleteResto(`${stringID}1`);

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: `${stringID}2` },
        { id: `${stringID}3` },
      ]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    favoriteResto.addResto({ id: `${stringID}1` });
    favoriteResto.addResto({ id: `${stringID}2` });
    favoriteResto.addResto({ id: `${stringID}3` });

    await favoriteResto.deleteResto(`${stringID}4`);

    expect(await favoriteResto.getAllResto())
      .toEqual([
        { id: `${stringID}1` },
        { id: `${stringID}2` },
        { id: `${stringID}3` },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteResto.addResto({
      id: `${stringID}1`, restaurant: { name: 'Great Bufetaria' },
    });
    favoriteResto.addResto({
      id: `${stringID}2`, restaurant: { name: 'Restaurant Bersama' },
    });
    favoriteResto.addResto({
      id: `${stringID}3`, restaurant: { name: 'Namaz Dining' },
    });
    favoriteResto.addResto({
      id: `${stringID}4`, restaurant: { name: 'Mie Express' },
    });

    expect(await favoriteResto.searchResto('Great Bufetaria')).toEqual([
      { id: `${stringID}1`, restaurant: { name: 'Great Bufetaria' } },
    ]);
  });
};

export { itActsAsFavoriteRestoModel };
