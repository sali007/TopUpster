module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            node: {
                files: ['app/**/*'],
                tasks: ['nodewebkit'],
                options: {
                    spawn: false
                }
            }
        },
        nodewebkit: {
            options: {
                platforms: ['win', 'osx', 'linux32', 'linux64'], // Платформы, под которые будет строиться наше приложение
                buildDir: "./build" // Путь, по которому будет располагаться построенное приложение
            },
            src: './app/**/*' // Путь, по которому располагаются исходные коды приложения
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.registerTask('default', ['watch']);
};