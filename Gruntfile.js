module.exports = function(grunt){
.	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jscs: {
			src: "*/*.js",
			options: {
				config: ".jscsrc",
				requireCurlyBraces: [ "if" ]
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'less', 'uglify']);
};
