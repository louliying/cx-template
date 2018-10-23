import ajax from '../utils/ajax';
// import baseUrl from './base';

export const getInfo = async (param = {}, config = {}) =>{
    // await ajax.get(`${baseUrl.serverB[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, config);
    return ajax.get(`/sjdbhome/getwinlist.json`, param, config);
}

export const test = async (param = {}, config = {}) =>
    // await ajax.get(`${baseUrl.serverA[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, {...config, timeout: 1000});
    ajax.get(`${baseUrl.serverA[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, {...config, timeout: 1000});
