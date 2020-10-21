import vCode from './verificationCode/verificationCode';

const components = {
	vCode
};

const install = function(Vue, Option){
	Object.keys(components).forEach((key) => {
		Vue.component(components[key].name, components[key]);
	});
};

export default{
	install
}