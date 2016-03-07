var Style		= require('./style');
var Styles		= require('./styles');
var styleDir	= base.path('styles');
var styles		= null;

function response(error, name) ***REMOVED***
	console.log(error);

	var message = 'Error retrieving ' + name;
	var status = 500;
	if (error.errno === -2) ***REMOVED***
		status = 404;
		message = name + ' not found';
	***REMOVED***

	this.status = status;
	this.body = ***REMOVED*** message: message ***REMOVED***;
***REMOVED***

function * list() ***REMOVED***
	try ***REMOVED***
		// assign styles for caching
		styles = styles || new Styles(styleDir);
		this.body = yield styles.getAll();
	***REMOVED*** catch(e) ***REMOVED***
		response.call(this, e, 'styles');
	***REMOVED***
***REMOVED***

function * get() ***REMOVED***
	try ***REMOVED***
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getDefinition();
	***REMOVED*** catch(e) ***REMOVED***
		response.call(this, e, styleName);
	***REMOVED***
***REMOVED***

function * getElement() ***REMOVED***
	try ***REMOVED***
		var elementName = this.params.element;
		var styleName = this.params.style;
		var style = new Style(styleName, styleDir);
		this.body = yield style.getElement(***REMOVED***dir: elementName***REMOVED***);
	***REMOVED*** catch(e) ***REMOVED***
		response.call(this, e, elementName);
	***REMOVED***
***REMOVED***

module.exports = ***REMOVED***
	get: get,
	getElement: getElement,
	list: list
***REMOVED***;
