import C from '../../../lib/global/config.js';


export const optionAPI = { parseProfile: true };
export const method = 'get';
export const handle = ({ _who }) => ({
	$from: C.privateKey.$from,
	app: C.privateKey[_who],
});
