function Compiler() ***REMOVED***
	this.processors = [];
***REMOVED***

Compiler.prototype = ***REMOVED***
	add: (pattern) => ***REMOVED***
		var tasks = Array.prototype.slice.call(arguments, 1);
		this.processors.push(***REMOVED***
			pattern: new RegExp(pattern, 'ig'),
			tasks: tasks
		***REMOVED***);
	***REMOVED***,
	process: function * (directory, files) ***REMOVED***
		var processed = ***REMOVED******REMOVED***;

		// loop through all files
		for (var fileIndex in files) ***REMOVED***
			var file = files[fileIndex];

			// loop through all processes
			for (var processIndex in this.processors) ***REMOVED***
				var process = this.processors[processIndex];

				// test if filename matches any process
				if (process.pattern.test(file)) ***REMOVED***

					// NOTE: should really use a reduce function im here

					// use result of previous process on same file
					// or start the result/input as a blank string,
					var result = processed[file] || '';

					// process each task and pass result
					// onto next function through body object
					for (var taskIndex in process.tasks) ***REMOVED***
						result = yield process.tasks[taskIndex].call(***REMOVED*** body: result ***REMOVED***, directory, file);
					***REMOVED***
					processed[file] = result;
				***REMOVED***
			***REMOVED***
		***REMOVED***
		return processed;
	***REMOVED***
***REMOVED***;


module.exports = Compiler;