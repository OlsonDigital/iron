var gulp 			 = require( 'gulp' );
var browserify 		 = require( 'browserify' );
var iron			 = require( 'iron' );
var path			 = require( 'path' );
var source           = require( 'vinyl-source-stream' );
var rename           = require( 'gulp-rename' );
var es               = require( 'event-stream' );

function browserifyTask(  ) {

	let librariesToCompile = iron.clientlibraries.get.all();

    // map them to our stream function
    var tasks = librariesToCompile.map(function(lib) {
        return browserify({ entries: [lib.entry.js] })
            .bundle()
            .pipe(source(lib.name))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest( lib.path + "/build/js" ))
			.on('end', function(){
				console.log("		Bundled " + lib.name);
			});
        });
    // create a merged stream
    return es.merge.apply(null, tasks);

}


module.exports = browserifyTask;
