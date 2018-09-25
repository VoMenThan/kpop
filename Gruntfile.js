module.exports = function(grunt) {

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			inputCSS: 	'development/css',
			inputSCSS: 	'development/scss',
			inputJS: 	'development/js',
			outputCSS: 	'production/css',
			outputJS: 	'production/js'
		},
		
		//css minify
		cssmin: {
			  options: {
			    mergeIntoShorthands: true,
			    roundingPrecision: 0
			  },
		  	target: {
			    files: [{
			      expand: true,
			      cwd: 'development/css',
			      src: ['styles.css', 'custom.css'],
			      dest: 'production/css',
			      ext: '.min.css'
			    }]
			  }
		},


		//concat file

		concat: {
		    options: {
		      separator: '',
		    },
		    dist: {
		      src: ['<%= dirs.inputJS %>/styles.js'],
		      dest: '<%= dirs.outputJS %>/styles.min.js',
		    },
		  },


		  //uglifyjs 

		  // Project configuration.
		  uglify: {
		    my_target: {
		      files: {
		        '<%= dirs.outputJS %>/styles.min.js': ['<%= dirs.inputJS %>/styles.js']
		      }
		    }
		  },
	  		

		
	    //Sass
		  sass: {                              // Task
		    dist: {                            // Target
		      options: {                       // Target options
		        style: 'compact'				//nested, compact, compressed, expanded
		      },
		      files: {                         // Dictionary of files
		        '<%= dirs.outputCSS %>/styles.css': '<%= dirs.inputSCSS %>/styles.scss'
		      }
		    }
		  },


		  watch: {
		  scripts: {
		    files: [
		    	'development/scss/*.scss',   	
		    	'development/scss/*/*.scss',   	
		    	'development/scss/*/*/*.scss', 	
		    	'development/*.html',  	
		    	'development/*/*.html'    	
		    	],
		    tasks: ['sass', 'includes'],
		    options: {
		      spawn: false,
		      livereload: true
		    },
		  },
		},

		connect: {
		    site1: {
		      options: {
		      	hostname: 'localhost',
		        port: 3069,
		        base: 'production/',
		        livereload: true
		      }
		  	}	
	    },
		  //Includes
		includes: {
		  files: {
		    src: [
		    	'development/index.html',
		    	'development/category.html',
		    	'development/detail.html',
		    	'development/newsletter.html',
		    	], // Source files
		    dest: 'production/', // Destination directory
		    flatten: true,
		    cwd: '.',
		    options: {
		      silent: true,
		      banner: '<!-- I am a banner <% includes.files.dest %> -->',
		      livereload: true
		    }
		  }
		},


	});

	//Load file
	
	//minify css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//concat file
	grunt.loadNpmTasks('grunt-contrib-concat');
	//uglifyjs nén javascript
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//SASS 
	grunt.loadNpmTasks('grunt-contrib-sass');
	//Watch
	grunt.loadNpmTasks('grunt-contrib-watch');
	//Connect
	grunt.loadNpmTasks('grunt-contrib-connect');
	//Include
	grunt.loadNpmTasks('grunt-includes');

	// Run file
	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('dev', ['includes', 'connect', 'watch']);



};