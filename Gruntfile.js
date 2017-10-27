module.exports = function(grunt){
    const path = require('path');

    grunt.initConfig({
        copy: {
              main: {
                files: [
                  // includes files within path
                  {expand: true, src: ['bower_components/jquery/dist/jquery.js'], dest: 'web/js/', flatten: true}

                  /*// includes files within path and its sub-directories
                  {expand: true, src: ['path/**'], dest: 'dest/'},

                  // makes all src relative to cwd
                  {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                  // flattens results to a single level
                  {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},*/
                ],
              },
            },
      express: {
        server: {
          options: {
            port: process.env.PORT || 9000,
            server: path.resolve('./server'),
            //bases: path.resolve(__dirname, 'web')
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default',['express', 'express-keepalive']);
    grunt.registerTask('heroku',['express', 'express-keepalive'])
};