var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/scss',
					src: ['style.scss'],
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


		responsive_images: {
			first: {
				options: {
					engine: 'gm',
					newFilesOnly: true,
					upscale: false,
					sizes: [{
						name: 'tiny',
						width: 640
					}, {
						name: 'small',
						width: 1280
					}, {
						name: 'medium',
						width: 2048,
					}, {
						name: 'large',
						width: 4096,
					}, {
						name: 'original',
						width: "100%",
					}],
				},
				files: [{
					expand: true,
					src: ['**.{jpg,gif,png}'],
					cwd: 'assets/pic/',
					dest: 'assets/temp/'
				}]

			},
			second: {
				options: {
					engine: 'gm',
					newFilesOnly: true,
					upscale: false,
					sizes: [{
						name: 'o',
						width: '50%',
						suffix: "@1x",
					}, {
						name: 'r',
						width: '100%',
						suffix: "@2x",
					}],
				},

				files: [{
					expand: true,
					src: ['**.{jpg,gif,png}'],
					cwd: 'assets/temp/',
					dest: 'public_html/assets/pic/'
				}]

			}
		},

		imagemin: {
			dynamic: { // Another target 
				options: { // Target options 
					optimizationLevel: 3,
					svgoPlugins: [{
						removeViewBox: false
					}],
					use: [mozjpeg()]
				},
				files: [{
					expand: true, // Enable dynamic expansion 
					cwd: 'public_html/assets/pic/', // Src matches are relative to this path 
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
					dest: 'public_html/assets/pic/' // Destination path prefix 
				}]
			}
		},


		includes: {
			// reference 
			// https://github.com/vanetix/grunt-includes 
			// for details
			files: {
				src: ['html/*.html'],
				dest: 'public_html',
				flatten: true,
				cwd: '.'
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					removeCommentsFromCDATA: true
				},
				files: [{
					expand: true,
					src: ['public_html/**/*.html'],
					destination: 'public_html/',
					ext: '.html'
				}]
			}
		},


		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin'] //
			},
			html: {
				files: ["html/**/*.html"],
				tasks: ["includes", "htmlmin"]
			},
			js: {
				files: 'assets/**/*.js',
				tasks: ['uglify']
			},
			img: {
				files: 'assets/pic/**/*.jpg',
				tasks: ['responsive_images:first', 'responsive_images:second', 'imagemin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');

	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['watch']);
};