/* eslint-disable no-await-in-loop */
const assert = require('assert');

Feature('Loving Restaurants');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty Favorite Restaurant', (I) => {
  I.see('Belum Ada Restoran Favorit', 'error-page');
});

Scenario('Showing a Restaurant on quickview mode ', async (I) => {
  I.amOnPage('/#/');
  I.seeElement('.more');

  const firstResto = locate('resto-item h3 a').first();
  const restoTitle = await I.grabTextFrom(firstResto);
  const firstButton = locate('.more').first();

  I.click(firstButton);
  I.seeElement('preview-resto.show');

  const quickviewTitle = await I.grabTextFrom('preview-resto h2 a');
  assert.strictEqual(restoTitle, quickviewTitle);

  I.seeElement('preview-resto .close');
  I.click('preview-resto .close');
});

Scenario('Search Restaurants by empty query', async (I) => {
  I.amOnPage('#/');
  I.seeElement('.hero-input-form');
  I.fillField('.hero-input-form', '');
  I.pressKey('Enter');

  I.dontSee('Item(s) found for', '.heading-title');
});

Scenario('Search Restaurants by NAME', async (I) => {
  const query = 'cafe';

  I.amOnPage('#/');
  I.seeElement('.hero-input-form');
  I.fillField('.hero-input-form', query);
  I.pressKey('Enter');

  I.see('Item(s) found for', '.heading-title');
  const visibleElements = await I.grabNumberOfVisibleElements('resto-item');
  for (let i = 0; i < visibleElements; i++) {
    const restoName = await I.grabTextFrom(locate('resto-item h3 a').at(i + 1));
    assert.match(restoName, new RegExp(query, 'gi'));
  }
});

Scenario('Search Restaurants by CITY', async (I) => {
  const query = 'surabaya';

  I.amOnPage('#/');
  I.seeElement('.hero-input-form');
  I.fillField('.hero-input-form', query);
  I.pressKey('Enter');

  I.see('Item(s) found for', '.heading-title');
  const visibleElements = await I.grabNumberOfVisibleElements('resto-item');
  for (let i = 0; i < visibleElements; i++) {
    const restoName = await I.grabTextFrom(locate('.lokasi').at(i + 1));
    assert.match(restoName, new RegExp(query, 'gi'));
  }
});

Scenario('Loving a Restaurant', async (I) => {
  I.amOnPage('#/');
  I.seeElement('resto-item h3 a');

  const firstResto = locate('resto-item h3 a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('.love-button');
  I.click('.love-button');

  I.amOnPage('/#/favorite');
  I.seeElement('resto-item');
  const likedRestoTitle = await I.grabTextFrom('resto-item h3 a');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('UnLoving a Restaurant', async (I) => {
  I.see('MY FAVORITE RESTAURANTS', '.heading-title');
  I.seeElement('.resto-title');
  I.click('.resto-title');

  I.seeElement('.love-button');
  I.click('.love-button');

  I.amOnPage('/#/favorite');
  I.see('Belum Ada Restoran Favorit', 'error-page');
});

// Scenario('Give a Review', async (I) => {
//   I.amOnPage('/#/');
//   I.seeElement('resto-item h3 a');

//   const firstResto = locate('resto-item h3 a').first();
//   const firstRestoTitle = await I.grabTextFrom(firstResto);
//   I.click(firstResto);

//   I.seeElement('h1');
//   const viewedRestoTitle = await I.grabTextFrom('h1');
//   assert.strictEqual(firstRestoTitle, viewedRestoTitle);

//   I.seeElement('[data-target="#review"]');
//   I.click('[data-target="#review"]');

//   I.seeElement('.input-star');
//   I.click('[for="star4"]');
//   I.fillField('#reviewer-name', 'Adjian');
//   I.fillField('#review-message', 'Excelent Test using CodeceptJS');
//   I.click('#sent-button');

//   I.see('Ulasan Kamu telah Ditambahkan, Terimakasih telah memberikan ulasan.', '.review-sent');
// });
