import { v4, version } from 'uuid';
import U from '../../lib/user.js';


const versionUUID = uuid => {
	try {
		return version(uuid);
	}
	catch(error) {
		return 0;
	}
};

export const method = 'wock';
export const handle = (app, id, who, token, wock) => {
	try {
		if(typeof app != 'string' || !app) { throw Error('参数~[app]类型不对'); }
		if(id && versionUUID(id) != 4) { throw Error('参数~[id]格式不对'); }
		if(typeof who != 'string' || !who) { throw Error('参数~[who]类型不对'); }
		if(token && versionUUID(token) != 4) { throw Error('参数~[token]格式不对'); }


		wock.type = 'staff';
		wock.app = app;
		wock.id = id;
		wock.who = who;
		wock.token = token;


		if(!id) { wock.cast('set-auth', (wock.id = v4()), who, token); }

		if(!token) { return; }


		const user = U[who];

		if(!user) { throw Error('找不到对应~[用户]'); }

		if(!user.key[token]) { throw Error('找不到密钥~[用户]'); }


		wock.cast('auth-successful');
		wock.cast('staff-start');
	}
	catch(error) {
		wock.authFailed = true;

		wock.cast('auth-failed', error.message ?? error?.toString());

		throw error;
	}
};
