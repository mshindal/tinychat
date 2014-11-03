module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			main: {
				files: [
					{		
						expand: true,
						dest: './public/js/jquery',
						cwd: './bower_components/jquery/dist',
						src: '**',
					},
					{
						expand: true,
						dest: './public/js/bootstrap',
						cwd: './bower_components/bootstrap/dist/js',
						src: '**',
					},
					{
						expand: true,
						dest: './public/css/bootstrap',
						cwd: './bower_components/bootstrap/less',
						src: '**/*',
					},
					{
						expand: true,
						dest: './public/fonts',
						cwd: './bower_components/bootstrap/dist/fonts',
						src: '**'
					}
				]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
}
