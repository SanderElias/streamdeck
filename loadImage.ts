import sharp from 'sharp';
import { myStreamDeck } from './test';
// myStreamDeck.fillColor(4, 0, 0, 255);
export function loadImage(tile: number, filename: string) {
  sharp(filename)
    .flatten() // Eliminate alpha channel, if any.
    .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
    .raw() // Give us uncompressed RGB.
    .toBuffer()
    .then(buffer => {
      myStreamDeck.fillImage(tile, buffer);
    })
    .catch(err => {
      console.error(err);
    });
}
