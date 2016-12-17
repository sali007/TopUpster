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
                platforms: ['win', 'osx', 'linux32', 'linux64'], // ���������, ��� ������� ����� ��������� ���� ����������
                buildDir: "./build" // ����, �� �������� ����� ������������� ����������� ����������
            },
            src: './app/**/*' // ����, �� �������� ������������� �������� ���� ����������
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.registerTask('default', ['watch']);
};