<template>
	<el-button type="primary" class="login-code-btn fr" @click="getCode">{{code}}</el-button>
</template>

<script>
	export default {
		name: 'fly-verification-code',
		props: {
			length: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				code: null
			}
		},
		watch: {
			code(val) {
				this.$emit('code', val);
			}
		},
		created() {
			this.getCode();
		},
		methods: {
			//获取验证码
			getCode(){
				var arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
                'S','T','U','V','W','X','Y','Z'],
                	code = '';
                for(let i = 0; i < this.length; i++){
                	var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
                	code += arr[index];
                };
                this.code = code;
			}
		}
	}
</script>