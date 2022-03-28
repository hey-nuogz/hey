import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import Moment from 'moment';

import D from '../../lib/data.js';


export const method = 'wock';
export const handle = (data, wock) => {
	const { who, app, token } = wock;

	if(!token) { throw Error(`无推送权限`); }


	const type = `${Moment().format('YYMMDD')}-${who}`;
	const fileData = resolve(D.$.dirConfig, `${D.$.prefixFile}.${type}.json`);

	if(!existsSync(fileData)) { writeFileSync(fileData, '{}'); }

	const push = {
		time: Moment().format(),
		title: data.title,
		body: data.body,
		icon: data.icon,
		image: data.image,
		type: data.type ?? 'link',
		data: data.data,
		tag: `${app}|${token}|${data.tag ?? ''}`,
	};


	D.$.edit(type, data => (data[token] ?? (data[token] = [])).unshift(push) && void 0);

	wock.wocker.wockConnections.forEach(wockConnection => {
		if(wockConnection.who == who && wockConnection.type == 'web') {
			wockConnection.cast('new-push', push, app);
		}
	});
};
