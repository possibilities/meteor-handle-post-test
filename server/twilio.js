var connect = __meteor_bootstrap__.require("connect");

__meteor_bootstrap__.app
  .use(connect.query())
  .use(connect.bodyParser())
  .use(function(req, res, next) {

    Fiber(function () {

      var splitUrl = req.url.split('/');

      if (splitUrl[1] !== '_twilio')
        return next();

      Messages.insert(req.body);

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('', 'utf-8');

    }).run();

  });
