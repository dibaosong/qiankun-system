<template>
	<div>
		<template v-for="(item, index) in menuData">
			<el-submenu v-if="item.subMenu" :index="''+index">
		        <template slot="title">
		          <i :class="item.icon"></i>
		          <span v-text="item.name"></span>
		        </template>
	         	<menuTree :menuData="item.subMenu"></menuTree>
	      	</el-submenu>
	      	<el-menu-item :index="item.href" :class="{'is-active': $route.path == item.href}" v-else>
		        <i :class="item.icon"></i>
		        <span slot="title" v-text="item.name"></span>
		    </el-menu-item>
		</template>
	</div>
</template>

<script>
	export default {
		props: ['menuData'],
		name: "menuTree"
	}
</script>