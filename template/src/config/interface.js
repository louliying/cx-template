import ajax from '../utils/ajax';
// import baseUrl from './base';

export const getInfo = async (param = {}, config = {}) => {
    return ajax.get(`/sjdbhome/getwinlist.json`, param, config);
};

export const test = async (param = {}, config = {}) =>
    ajax.get(`/mobile/home/getHeadData`, param, config);
