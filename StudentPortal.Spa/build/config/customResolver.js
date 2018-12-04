var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

class CustomResolver {
    constructor(source, target) {
      this.source = source;
      this.target = target;
    }
  
    apply(resolver) {
      resolver.plugin('module', function(request, callback) {
        if (request.request[0] === '#') {
            fs.readFile("./obj/_cache/app-player-react/index.js", function(err, data) {
                console.log("data", data);
                console.log("err", err);

                let requestPath = request.request.substr(1);
                let newRequest = Object.assign({}, request);
        
                newRequest.request = "../obj/_cache/" + requestPath;
                
                console.log("old request", request);
                console.log("new request", newRequest);
                //this.doResolve(['file'], obj, callback);
                this.doResolve(['module'], newRequest, "message", callback);
            });          
        }
        else {
          callback();
        }
      });
    }
  };

  module.exports = CustomResolver;