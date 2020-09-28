module.exports = function (grunt){
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		// configuro la herramienta sass para que agarre todos los archivos .scss
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		watch: {
			files: ['css/*.scss'],
			tasks: ['css']
		},
		browserSync: {
			dev: {
				bsFiles: {		// Browser Files.
					src: [
					'css/*.css',
					'*.html',
					'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'	// Directorio base para nuestro servidor.
					}
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{		// Browser Files.
					expand: true,
					cwd: './',
					src: 'imagenes/*.{png,gif,jpg,jpeg}',
					dest: 'dist/imagenes',
				}]
			}
		},
		copy: {
			// html: {
			// 	files: [{
			// 		expand: true,
			// 		dot: true,
			// 		cwd: './',
			// 		src: ['*.html'],
			// 		dest: 'dist'
			// 	}]
			// },
			html2: {
				files: [{
					expand: true,
					dot: true,
					cwd: './paginas/',
					src: ['*.html'],
					dest: 'dist/paginas/'
				}]
			}
			// ,
			// css: {
			// 	files: [{
			// 		// for font-awesome
			// 		expand: true,
			// 		dot: true,
			// 		cwd: 'node_modules/open-iconic/font/',
			// 		src: ['css/*.*'],
			// 		dest: 'dist'	
			// 	}]
			// },
			// fonts: {
			// 	files: [{
			// 		// for font-awesome
			// 		expand: true,
			// 		dot: true,
			// 		cwd: 'node_modules/open-iconic/font/',
			// 		src: ['fonts/*.*'],
			// 		dest: 'dist '	
			// 	}]
			// }
		},

		clean: {
			build: {
				src:['dist/']
			}
		},

		cssmin: {
			dist: {}
		},

		uglify: {
			dist: {}		//para el js
		},

		filerev: {	//genera un codigo hash para que no se baje siempre la misma version.
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		concat: {
			 options: {
			 	separator: ';'
			 },
			 dist: {}
		},

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['paginas/index.html', 'paginas/precios.html' , 'paginas/contacto.html', 'paginas/nosotros.html', 'paginas/productos.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
						}]
					}
				}
			}
		},

		usemin: {
			html: ['dist/paginas/index.html','dist/paginas/precios.html', 'dist/paginas/contacto.html', 'dist/paginas/nosotros.html', 'dist/paginas/productos.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}

	});




	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.registerTask('css',['sass']);
	grunt.registerTask('img:compress',['imagemin']);
	grunt.registerTask('build', [
						'clean',
						'copy',
						// 'imagemin',
						'useminPrepare',
						'concat',
						'cssmin',
						'uglify',
						'filerev',
						'usemin'
						]);

	// Tarea por defecto que se ejecuta al ejecutar 'grunt' solo.
	grunt.registerTask('default',['browserSync','watch']);

};