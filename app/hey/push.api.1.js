import { privateDecrypt } from 'crypto';
import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import Moment from 'moment';

import C from '../../lib/global/config.js';
import U from '../../lib/user.js';
import D from '../../lib/data.js';


export const method = 'post';
export const handle = (raw, ctx, route, $) => {
	const { from: fromRaw, data: dataRaw } = raw;

	if(!fromRaw || typeof fromRaw != 'string') { throw Error(`~[form]不正确`); }
	if(!dataRaw || typeof dataRaw != 'string') { throw Error(`~[data]不正确`); }


	let who;
	let app;
	try {
		({ who, app } = JSON.parse(privateDecrypt({
			key:`-----BEGIN PRIVATE KEY-----\n${C.privateKey.$from}\n-----END PRIVATE KEY-----`
		}, Buffer.from(fromRaw, 'base64')).toString('utf8')));
	}
	catch(error) { throw Error('解密~[from]失败'); }



	const keyPrivateData = U[who]?.[app];
	if(!keyPrivateData) { throw Error(`无推送权限`); }


	let data;
	try {
		(data = JSON.parse(privateDecrypt(keyPrivateData, Buffer.from(dataRaw, 'base64')).toString('utf8')));
	}
	catch(error) { throw Error('解密~[data]失败'); }


	const type = `${Moment().format('YYMMDD')}-${who}`;
	const fileData = resolve(D.$.dirConfig, `config.${type}.json`);

	if(!existsSync(fileData)) { writeFileSync(fileData, '{}'); }

	const push = {
		time: Moment().format(),
		title: data.title,
		body: data.body,
		icon: data.icon,
		image: data.image,
		type: data.type ?? 'link',
		data: data.data,
		tag: data.tag,
	};


	D.$.edit(type, data => {
		const datas = data[app];
		datas.unshift(push) && void 0;
	});

	$.W.wockConnections.forEach(wockConnection => {
		if(wockConnection.who == who && wockConnection.type == 'web') {
			wockConnection.cast('new-push', push, app);
		}
	});
};
