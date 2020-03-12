import { loadImage } from './loadImage';

export interface Command {
  tile: number;
  image: string;
  action: () => void;
}

export const cmdList = new Map<number, Command>();


export function installCommand(tile: number, image: string, action: () => void) {
  cmdList.set(tile, {
    tile,
    image,
    action,
  });
  loadImage(tile, image);
}
