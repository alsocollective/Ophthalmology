module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/scss',
					src: ['*.scss'],
					dest: 'assets/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'public_html/assets/css/style.min.css': [
						"assets/css/normalize.min.css",
						"assets/css/slick.css",
						"assets/css/style.css",
					]
				}
			}
		},
		uglify: {
			js: {
				files: {
					'public_html/assets/js/main.min.js': [
						'assets/js/lib/jquery.min.js',
						'assets/js/lib/jquery.waypoints.min.js',
						'assets/js/lib/skrollr.min.js',
						'assets/js/lib/slick.min.js',
						'assets/js/*.js'
					]
				}
			}
		},
		includes: {
			// reference 
			// https://github.com/vanetix/grunt-includes 
			// for details
			files: {
				src: ['dev/index.html'],
				dest: 'public_html',
				flatten: true,
				cwd: '.'
			}
		},
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin'] //
			},
			html: {
				files: ["dev/**/*.html"],
				tasks: ["includes"]
			},
			js: {
				files: 'assets/**/*.js',
				tasks: ['uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');
	grunt.registerTask('default', ['watch']);
};