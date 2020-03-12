import {exec} from 'child_process';
import {openStreamDeck} from 'elgato-stream-deck';
import open from 'open';
import {resolve} from 'path';
import {installCommand, cmdList} from './installCommand';
// import * as i3 from 'node-i3';
const  i3 = require('i3').createClient()
// const i3 = I3
export const myStreamDeck = openStreamDeck();

myStreamDeck.clearAllKeys();

installCommand(7, resolve(__dirname, './assets', 'Octocat.png'), () => {
  open('https://github.com/scullyio/scully/pulls');
});
installCommand(6, resolve(__dirname, './assets', 'gmail.png'), () => {
  open('https://gmail.com');
});
installCommand(14, resolve(__dirname, './assets', 'refresh.png'), () => {
  setTimeout(() => {
    exec('ts-node test').unref();
    process.exit(0);
  }, 10);
});
installCommand(13, resolve(__dirname, './assets', 'exit.png'), () => {
  setTimeout(() => {
    // exec('ts-node test').unref();?
    myStreamDeck.clearAllKeys();
    myStreamDeck.close();
    process.exit(0);
  }, 10);
});

installCommand(4, resolve(__dirname, './assets', 'left.png'), () => {
  i3.command('move workspace to output left', (...args: any) => console.log(args))
});

myStreamDeck.on('up', keyIndex => {
  console.log('key %d up', keyIndex);
  const active = cmdList.get(keyIndex);
  if (active) {
    active.action();
  }
});

// Fired whenever an error is detected by the `node-hid` library.
// Always add a listener for this event! If you don't, errors will be silently dropped.
myStreamDeck.on('error', (error: any) => {
  console.error(error);
});

