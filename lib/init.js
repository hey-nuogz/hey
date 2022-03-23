import Moment from 'moment';

import PKG from './global/package.js';
import G from './global/log.js';


process.title = PKG.name;
process.on('unhandledRejection', (error, promise) => { G.fatal('进程', '未处理的拒绝', error); });


Moment.locale('zh-cn');
Moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
