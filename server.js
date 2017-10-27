var express    =    require('express');
var app        =    express();
var request = require('request');





var port = process.env.PORT || 9000;

app.use(express.static('web'));

var options = {
  host: '52.30.52.93',
  port: 80,
  path: '/api/jobSerach'
};


app.get('/api/jobSearch', function(req,res){
    //console.log('reached here');
  
    var propertiesObject = req.params;
    console.log(JSON.stringify(propertiesObject));
    console.log(JSON.stringify((req.query)))
    request({url:"http://52.30.52.93/api/jobSerach", qs:{name: req.query.name, desc: req.query.desc}}, function(err, response, body) {
      if(err) { console.log(err); return; }
      console.log("Get response: " + response.statusCode);
      console.log("Get response: " + response.body);
      res.send(response.body);
    });
  
});

app.get('/testHelloWorld', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})