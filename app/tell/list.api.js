import Moment from 'moment';
import D from '../../lib/data.js';


export const optionAPI = { parseProfile: true };
export const method = 'get';
export const handle = (raw, ctx) => {
	const { date = Moment().format('YYMMDD') } = raw;

	const { _who: who } = raw;



	return D[`${date}-${who}`] ?? [];
};
