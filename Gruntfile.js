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
			// build: {
			// 	cwd: 'site',
			// 	src: ['dev/**/*.html', 'dev/base.html'],
			// 	dest: 'build/',
			// 	options: {
			// 		flatten: true,
			// 		includePath: 'include',
			// 		banner: '<!-- Site built using grunt includes! -->\n'
			// 	}
			// }
			files: {
				src: ['dev/index.html'], // Source files
				dest: 'public_html', // Destination directory
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