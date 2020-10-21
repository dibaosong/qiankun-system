<template>
	<div>
		<div class="menu-top">
			<el-menu router mode="horizontal" background-color="#409eff" text-color="#fff" active-text-color="#fff">
				<div class="logo fl tc">飞行营地</div>
				<div class="menu-top-icon fr tc">
					<i class="el-icon-bell"></i>
					<el-tooltip class="item" effect="dark" content="退出系统" placement="bottom" :hide-after="1000">
				      	<i class="el-icon-close" @click="closeSystem($event)"></i>
				    </el-tooltip>
				</div>
			</el-menu>
		</div>
		<div class="content clearfix" :style="{height: contentH + 'px'}">
			<div class="menu-left fl">
				<div class="top tc pt20 f14">
					<img class="top-img" :src="info.avatar" alt="">
					<p v-text="info.name"></p>
					<p v-text="info.auth"></p>
				</div>
				<el-menu router :default-active="$route.path">
			      	<menuTree :menuData="menu"></menuTree>
			    </el-menu>
			</div>
			<div class="content-right fr" id="subView">
				
			</div>
		</div>
	</div>
</template>

<script>
	import '@css/public/main';

	import api from '@/api/common/common';

	import menuTree from '@/views/public/menuTree';

	import {mapState, mapMutations} from 'vuex';

	export default {
		components: {
			'menuTree': menuTree
		},
		data() {
			return {
				menu: [],
				contentH: 0
			}
		},
		mounted() {
			this.getContentH();
			window.onresize = () => {
				this.getContentH();
			};
			//获取系统菜单
			this.getMenu();
		},
		computed: {
			...mapState([
	 			'info'
	 		])
		},
		methods: {
			...mapMutations([
	 			'updateInfo'
	 		]),
			//获取系统菜单
			getMenu(){
				api.getMenu().then((res) => {
					var data = res.data;
					this.updateInfo(data.info);
					this.menu = data.menu;
					var path = this.$route.path;
					//如果进来是系统欢迎页面，为了显示出左侧菜单，需要path为 /system/，方便请求数据能查看
					if(path == '/system/welcome'){
						path = '/system/';
					};
				});
			},
		    getContentH(){
		    	let wh = window.innerHeight;
				this.contentH = wh - 60;
		    },
		    //退出系统
		    closeSystem(event){
		    	event.currentTarget.blur(); //点击后失去一下焦点，为了解决当点击取消时退出系统提示文字又显示的问题
		    	this.$confirm('是否确认注销登录', '', {
		    		type: 'warning'
		    	}).then(() => {
		    		console.log('确认');
		    		localStorage.removeItem('token');
		    		this.$router.push({'name': 'login', 'query': {'redirect': this.$route.fullPath}});
		    	}).catch(() => {
		    		console.log('取消');
		    	})
		    }
		}
	}
</script>