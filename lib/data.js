import { resolve } from 'path';

import Poseidon from '@nuogz/poseidon';

import { dirApp } from './global/dir.js';


const D = new Poseidon(resolve(dirApp, 'data'));
D.$.prefixFile = 'data';


export default D;
