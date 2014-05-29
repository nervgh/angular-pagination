module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:  '/*\n' +
                    ' <%= pkg.name %> v<%= pkg.version %>\n' +
                    ' <%= pkg.homepage %>\n' +
                    '*/\n',

        clean: {
            working: {
                src: ['angular-pagination.*']
            }
        },

        uglify: {
            js: {
                src: ['src/pagination.js'],
                dest: 'angular-pagination.min.js',
                options: {
                    banner: '<%= banner %>'
                }
            }
        },

        concat: {
            js: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                src: ['src/pagination.js'],
                dest: 'angular-pagination.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
