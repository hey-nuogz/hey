import { resolve } from 'path';

import Poseidon from '@nuogz/poseidon';

import { dirApp } from './global/dir.js';


const dirData = resolve(dirApp, 'data');


const D = new Poseidon('', dirData);



export default D;