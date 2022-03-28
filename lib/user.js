import { resolve } from 'path';

import Poseidon from '@nuogz/poseidon';

import { dirApp } from './global/dir.js';


const dirUser = resolve(dirApp, 'config', 'user');


const U = new Poseidon(dirUser);
U.$.prefixFile = 'user';


export default U;
