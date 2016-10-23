module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    var http = require('http');
    var fs = require('fs');

    var options = {
        host: 'cbsg.sourceforge.net',
        port: 80,
        path: '/cgi-bin/live'
    };

    var allBingoData = {
        strings : []
    };
    var wholeData = '';

    http.get(options, function(res) {
        context.log("Got response: " + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            wholeData = chunk;
        });
        res.on('end', function() {
            if (wholeData != null) {
                var lines = wholeData.split("\n");

                for (i = 0; i < lines.length; i++) {
                    if ( lines[i].startsWith('<li>') ) {
                        var bingoStr = lines[i].replace('<li>', '').replace('</li>', '');
                        allBingoData.strings.push(bingoStr);
                    } 
                }

                context.log(allBingoData.strings.length);

                if (allBingoData.strings.length > 0) {
                    var json = JSON.stringify(allBingoData);
                    fs.unlink('D:\\home\\site\\wwwroot\\SeedBingo\\seed.json', (err) => {
                        if (err) throw err;
                        context.log('deleted file');
                        fs.writeFile('D:\\home\\site\\wwwroot\\SeedBingo\\seed.json', json);
                        context.log('write strings to json');
                        context.log('SEED FINISHED');

                        context.res = {
                            body: "SEED SUCCESSFULL - " + allBingoData.strings.length + " new strings"
                        };

                        context.done();
                    });
                
                }

            } else {
                context.log('lines are empty');
            }
        });
    }).on('error', function(e) {
        context.log("Got error: " + e.message);
    });

};