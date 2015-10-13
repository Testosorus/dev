var express = require('express');
var app = express();
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "testosorus"});
var opbeat = require('opbeat')({
	appId: '8889773ced',
	organizationId: 'd52dc54a33064ddd9ce3d8ec8538ac82',
	secretToken: '985678b054f3ae41939af6ffada034e27b89b906',
	logger: require('bunyan')({ name: "Testo", level: 'info' }),
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(opbeat.middleware.express());

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

log.info('Server start on port %d', app.get('port'));
opbeat.captureError('Test Oh My Phone');
