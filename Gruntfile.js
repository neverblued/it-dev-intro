module.exports = function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jscs: {
			src: ['*.js', 'model/*.js'],
			options: {
				config: '.jscsrc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-jscs');

//	grunt.registerTask('default', []);
};
