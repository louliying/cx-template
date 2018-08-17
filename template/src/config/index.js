import baseUrl from './proxy';
import * as Interfaces from './interface';

import * as Util from '../utils/utils';
let sDomain = Util.getDomainByKey('domain');

export {
	baseUrl,
	Interfaces,
	sDomain
};

/*
import ajax from './ajax';
console.log(process.env.NODE_ENV);
let baseUrl = {
	serverB: {
		dev: 'http://baidu.com',
		sit: 'http://aadasd.com',
		production: 'http://gateway.fangkuaiyi.com/'
	},
	serverA: {
		dev: 'http://qq.com',
		sit: 'http://aadasd.com',
		production: 'http://gateway.fangkuaiyi.com/'
	}
};

export const getInfo = async (param = {}, config = {}) =>
	// await ajax.get(`${baseUrl.serverB[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, config);
	ajax.get(`${baseUrl.serverB[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, config);

export const test = async (param = {}, config = {}) =>
	// await ajax.get(`${baseUrl.serverA[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, {...config, timeout: 1000});
	ajax.get(`${baseUrl.serverA[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, {...config, timeout: 1000});
*/