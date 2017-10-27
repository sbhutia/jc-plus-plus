var express    =    require('express');
var app        =    express();
var request = require('request');

var http = require('http')



var port = process.env.PORT || 9000;

app.use(express.static('web'));

var options = {
  host: '52.30.52.93',
  port: 80,
  path: '/api/jobSearch'
};


app.get('/api/jobSearch', function(req,res){
    //console.log('reached here');
  
    var propertiesObject = req.params;
    //console.log(JSON.stringify(propertiesObject));
  
    
    //console.log(JSON.stringify((req.query)))
    request({url:"http://52.30.52.93/api/jobSearch", qs:{name: req.query.name, desc: req.query.desc}}, function(err, response, body) {
      if(err) { console.log(err); return; }
      console.log("Get response: " + response.statusCode);
      //console.log("Get response: " + response.body);
      res.send(response.body);
    });
  
});

app.post('/api/jobSearch', function(req,res){
    //console.log('reached here');
  
    var propertiesObject = req.params;
    //console.log(JSON.stringify(propertiesObject));
    //console.log(JSON.stringify((req.query)))
    /*var options = {
      uri: "http://52.30.52.93/api/jobSearch",
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      json: {name: req.query.name, desc: req.query.desc}
    };

    request(options, function (error, response, body) {
      if(error) { console.log(error); return; }
      console.log("Get response: " + response.statusCode);
      console.log("Get response: " + response.body);
      console.log("Get response: " + body);
      res.send(response.body);
    });*/
  
  /*request.post(
        'http://www.yoursite.com/formpage',
        { json: { key: 'value' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );*/
  
    request({
                 url: "http://52.30.52.93/api/jobSearch",
                method : "POST",
                json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                   "name":req.query.name,
                   "desc":req.query.desc
                 })
            }, function(err, response, body) {
              if(err) { console.log(err); return; }
              console.log("POST response: " + response.statusCode);
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