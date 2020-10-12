const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../src/public/images/heros');
const destination = path.resolve(__dirname, '../dist/images/heros');

if (!fs.existsSync(destination)) fs.mkdirSync(destination);

fs.readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(
      path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-medium.webp`),
    );

  sharp(`${target}/${image}`).resize(400)
    .toFile(
      path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-small.webp`),
    );
});
