import './lib/init.js';

import { resolve } from 'path';

import Server from '@nuogz/desire';

import { dirApp } from './lib/global/dir.js';
import C from './lib/global/config.js';
import G from './lib/global/log.js';

import initRoute from './lib/initRoute.js';

import initMareParseResult from './lib/mare/parseResult.mare.js';
import initMareParseProfile from './lib/mare/parseProfile.mare.js';


const { folds, faces } = await initRoute(resolve(dirApp, 'app'));


new Server({
	name: '服务',
	host: C.server.host,
	port: C.server.port,

	mare: {
		before: ['parseRaw', initMareParseProfile],
		after: [initMareParseResult],
	},

	facePrefix: '/api',

	faces,
	folds,

	logger: G,

	wock: {
		disable: false,
		route: 'wock',
		ping: false,
	},
}).start();