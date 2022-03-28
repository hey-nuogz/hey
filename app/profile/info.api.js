import AS from 'assert';

import Moment from 'moment';

import U from '../../lib/user.js';


export const method = 'get';
export const handle = (raw, ctx) => {
	const profile = U[raw.who];

	AS(profile, `未找到~[档案]~{${raw.who}}`);

	ctx.cookies.set('who', profile.id, {
		expires: Moment().add(1, 'month').toDate(),
		httpOnly: false,
		overwrite: true
	});

	return profile;
};
