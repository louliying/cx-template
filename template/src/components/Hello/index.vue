<template>
	<div class="hello">
		<h1></h1>
		<h1></h1>
		<h2></h2>
		<h2></h2>
		<!--<h2></h2>-->
		<router-link to="/list">去动态加载的路由</router-link>
		<mt-button type="default">default</mt-button>
		<mt-button type="primary">primary</mt-button>
		<mt-button type="danger">danger</mt-button>
	</div>
</template>

<script>
// import { getInfo } from '@/common/api';
// import { isWeixin } from '@/common/utils';
export default {
	name: 'Hello',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App SCSS',
			lxl: {
			//  a:""
			}

		};
	},
	created () {
		this.$MD.user.getInfo({
			cartkey: '39b813508b44e73a66bfddbb0563f91e',
			demandcartkey: '39b813508b44e73a66bfddbb0563f91e',
			provinceid: 1,
			province: 1,
			provincename: '上海',
			tradername: 'yw_app',
			trader: 'h5',
			closesignature: 'yes',
			signature_method: 'md5',
			timestamp: '1521771333651',
			signature: '****',
			siteid: 0
		}).then(data => {
			console.log(data);
			setTimeout(() => {
				this.$MD.user.name = '我在2秒后修改了';
			}, 2000);
		});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
