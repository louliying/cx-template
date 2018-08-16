// import * as Interfaces from '../../config/index';
import * as Interfaces from '../../config/interface';

export default {
	name: 'CX',
	info: {},
	nameList: [
		{name: 'CX1', age: 29},
		{name: 'CX2', age: 37}
	],
	getInfo (name) {
		return new Promise((resolve, reject) => {
			Interfaces.test({
				cartkey: '39b813508b44e73a66bfddbb0563f91e',
				demandcartkey: '39b813508b44e73a66bfddbb0563f91e',
				provinceid: 1,
				province: 1,
				provincename: '上海2',
				tradername: 'yw_app',
				trader: 'h5',
				closesignature: 'yes',
				signature_method: 'md5',
				timestamp: '1521771333651',
				signature: '****',
				siteid: 0
			}, {
				headers: {'test1': '123456'}
			}).then((data) => {
				console.log(data.data);
				this.info = data;
				resolve(data.data);
			});
		});
	}
};
