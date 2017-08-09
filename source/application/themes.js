import color from 'color';

const common = {
	active: 'rgba(66, 165, 245, 1)',
	error: 'rgba(205, 63, 69, 1)',
	success: 'rgba(74, 165, 74, 1)',
	dark: 'rgba(15, 15, 15, 1)',
	light: 'rgba(220, 220, 220, 1)'
};

const dark = {
	...common,
	name: 'dark',
	background: 'rgba(39, 44, 48, 1)',
	border: 'rgba(54, 64, 70, 1)',
	color: 'rgba(238, 238, 238, 1)',
	tint: color(common.dark).mix(color(common.active), 0.075).toString()
};

const light = {
	...common,
	name: 'light',
	background: 'rgba(255, 255, 255, 1)',
	border: 'rgba(228, 228, 228, 1)',
	color: 'rgba(68, 68, 68, 1)',
	tint: color(common.light).mix(color(common.active), 0.075).toString()
};

export {dark, light};
