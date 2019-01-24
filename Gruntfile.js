module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			css: {
				src: [
					'node_modules/uikit/dist/css/uikit.min.css',
					'public/css/style.css'
				],
				dest: 'public/css/style.min.css'
			},
			js: {
				src: [
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/uikit/dist/js/uikit.min.js',
					'node_modules/uikit/dist/js/uikit-icons.min.js',
					'public/js/login.js',
					'public/js/main.js'
				],
				dest: 'public/js/main.min.js'
			}
		},
		express: {
			dev: {
				options: {
					script: 'index.js'
				}
			}
		},
		watch: {
			express: {
				files:  ['*.js', '**/*.js', '**/*.css'],
				tasks:  ['concat', 'express:dev'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['concat', 'express:dev', 'watch']);
};
