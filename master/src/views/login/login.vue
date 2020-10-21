<template>
	<div class="login-box bc">
		<h1 class="tc login-title">管理系统</h1>
		<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
			<el-form-item label="用户名" prop="user">
			    <el-input v-model.trim="loginForm.user" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
			    <el-input v-model.trim="loginForm.password" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="codes">
			    <el-input v-model.trim="loginForm.codes" placeholder="请输入验证码" maxlength="4" class="login-code-input"></el-input>
			    <fly-verification-code :length="4" @code="onCode"></fly-verification-code>
			</el-form-item>
			<el-button type="primary" class="w" @click="login('loginForm')">登录</el-button>
		</el-form>
		<el-checkbox v-model="rememberUser" class="mt10">记住账号</el-checkbox>
	</div>
</template>

<script>
	import '@css/login/login';
	import api from '@/api/login/login';
	export default {
		data(){
			return {
				loginForm: {
					user: '',
					password: '',
					codes: ''
				},
				rules: {
					user: [
						{required: true, message: '请输入用户名', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'}
					],
					codes: [
						{required: true, message: '请输入验证码', trigger: 'blur'}
					]
				},
				rememberUser: false,
				code: null
			}
		},
		created(){
	 		this.setUser();
	 	},
		methods: {
			//如果记住账号
			setUser(){
				let user = localStorage.getItem('user');
				if(!!user){
					this.loginForm['user'] = user;
					this.rememberUser = true;
				};
			},
			//登录
			login(loginForm){
				this.$refs[loginForm].validate((valid) => {
		          if (valid) {
		          	//如果验证码输入不正确
		            if(this.loginForm.codes.toLowerCase() != this.code.toLowerCase()){
		            	this.$alert('验证码错误！');
		            	return;
		            };
		            api.login(this.loginForm).then((res) => {
		            	var data = res.data;
		            	if(data.ok){
		            		//存储token
		            		localStorage.setItem('token', data.token);
		            		//如果记住账号
		            		if(this.rememberUser){
		            			localStorage.setItem('user', this.loginForm['user']);
		            		}else{
		            			localStorage.removeItem('user');
		            		};
		            		let redirect = this.$route.query.redirect;
		            		//如果是访问登录后的页面跳转至的登录，则登录成功后跳回，否则正常进入系统主页
		            		if(!!redirect){
		            			this.$router.push({'path': redirect});
		            		}else{
		            			this.$router.push({'name': 'System'});
		            		};
		            	}else{
		            		this.$alert(data.errorMsg);
		            	};
		            });
		          };
		        });
			},
			//验证码
			onCode(val){
				this.code = val;
			}
		}
	}
</script>