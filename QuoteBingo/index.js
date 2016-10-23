
module.exports = function(context, req) {

    var fs = require('fs');
    var bingoData = JSON.parse(fs.readFileSync('D:\\home\\site\\wwwroot\\SeedBingo\\seed.json', 'utf8'));

    var output = {
        strings : [],
        count : 0,
        total : 0
    };

    if (req.query.number) {
        context.log('returning ' + req.query.number + ' strings');
        var count = 0;
        for (i = 0; i < req.query.number; i++) {
            var str = bingoData.strings[getRandomIntInclusive(0, bingoData.strings.length)];

            if (req.query.maxlength) {
                while (str.length > req.query.maxlength) {
                    str = bingoData.strings[getRandomIntInclusive(0, bingoData.strings.length)];
                } 
            }

            if (output.strings.indexOf(str) < 0) {
                output.strings.push(str);
            }
            //if doublicate was found try to get another string which is not already in the return array
            //try this a finite number of times - max. the number of overall available items
            else if (count < bingoData.strings.length) {
                i--;
            }
            count++;
        }
        output.count = output.strings.length;
        output.total = bingoData.strings.length;
    }
    else {
        context.log('returning all strings');

        var str = bingoData.strings[getRandomIntInclusive(0, bingoData.strings.length)];

        if (req.query.maxlength) {
            while (str.length > req.query.maxlength) {
                str = bingoData.strings[getRandomIntInclusive(0, bingoData.strings.length)];
            } 
        }

        output.strings.push(str);
        output.count = 1;
        output.total = bingoData.strings.length;
    }

    context.log(output);

    context.res = {
        status: 200,
        body: JSON.stringify(output)
    };

    context.done();
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}