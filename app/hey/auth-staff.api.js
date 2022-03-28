import U from '../../lib/user.js';

export const method = 'wock';
export const handle = (app, token_, wock) => {
	if(typeof app != 'string' || !app) { throw Error('参数~[app]类型不对'); }


	wock.type = 'staff';
	wock.app = app;



	if(!token_) { return; }


	let who;
	let token;
	try {
		if(typeof token_ != 'string' || !token_) { throw Error('参数~[token]类型不对'); }


		[who, token] = token_.split('|');


		const user = U[who];

		if(!user) { throw Error('找不到对应~[用户]'); }

		if(!user.key[token]) { throw Error('找不到密钥~[用户]'); }
	}
	catch(error) {
		wock.cast('auth-failed', error.message ?? error?.toString());

		wock.authFailed = true;
		wock.tokenFaild = token_;

		throw error;
	}

	wock.who = who;
	wock.token = token;

	wock.cast('authed');
	wock.cast('start');
};
