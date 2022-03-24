import Moment from 'moment';
import D from '../../lib/data.js';


export const optionAPI = { parseProfile: true };
export const method = 'get';
export const handle = raw => {
	const { _who: who, date = Moment().format('YYMMDD') } = raw;


	return D[`${date}-${who}`] ?? [];
};
