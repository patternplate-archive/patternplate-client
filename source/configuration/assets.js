const assets = {
	'browserify': {
		'transforms': {
			'babelify': {
				'enabled': true,
				'opts': {
					'stage': 0,
					'optional': ['runtime']
				}
			},
			'uglifyify': {
				'enabled': false,
				'opts': {
					'global': true
				}
			}
		}
	},
	'less': {

	}
};

export default assets;
