/**
 * Created with JetBrains PhpStorm.
 * User: santa
 * Date: 17.04.13
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */

/**
main: Елизавета Шатохина КПУ

second: Анна Ионова ЗГИА
        Ксения Плющ ЗНТУ

 Usage: main.js <main_candidat_id> <second> <third> <main_time(in seconds)> <second_time>

*/


var vote = function(candidat_id) {
    var page;

//// dispose of page before moving on
//if (typeof page !== 'undefined')
//    page.release();
//
//// dispose of phantomjs if we're done
//if (pageIndex > 13) {
//    phantom.exit();
//    return;
//}

    page = require('webpage').create();
    var currentPage = 'http://www.061.ua/photovistavka/169';

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    afunc = function() {
        console.log(test);
        function sleep(ms) {ms += new Date().getTime();while (new Date() < ms){}}
        sleep(1000);
    };

    var params = {
        'call': function() {
            $.ajax({
                'url': 'http://www.061.ua/photovistavka/169',
                'type': 'POST',
                'data': JSON.stringify({
                    "jsonrpc":"2.0",
                    "method":"vote",
                    "params":[this.id],
                    "id":1
                }),
                'success': function(data) {
                    console.log('success vote for '+this.id);
                    console.log(data);
                },
                'error': function(data) {
                    console.log('error vote for '+this.id);
                    console.log(data);
                }
            });
        },
        'id': candidat_id
    };

    page.open(currentPage, function(status) {
        if (status === 'success') {
            page.clearCookies();
            page.deleteCookie('PHPSESSID');
            window.setTimeout(function() {
                page.evaluate(function(args){
//                    console.log(args.id);
                    $.ajax({
                        'url': 'http://www.061.ua/api/v1/jsonrpc?map=phvistavka',
                        'type': 'POST',
                        'data': JSON.stringify({
                            "jsonrpc":"2.0",
                            "method":"vote",
                            "params":[args.id],
                            "id":1
                        }),
                        'success': function(data) {
                            console.log('success vote for '+args.id);
                            console.log(JSON.stringify(data));
                        },
                        'error': function(data) {
                            console.log('error vote for '+args.id);
                            console.log(JSON.stringify(data));
                        }
                    });
                }, params);
//                page.deleteCookie('')

            }, 900);

        }
        else {
            console.log('error crawling page. status: ' + status);
            page.release();
        }
    });
}

var getArg = function(num) {
    return (!!phantom.args[num]) ? phantom.args[num] : false;
}

var rindomizeTime = function() {

}

if (phantom.args.length === 0) {
    console.log('Usage: main.js <main_candidat_id> <second> <third> <main_time(in seconds)> <second_time>');
    phantom.exit();
}

var main_candidat_id = getArg(0);
var main_time = getArg(3) || 10000;//60000;
//var second = getArg(1);
//var third = getArg(2);
//
//var second_time = getArg(4) || 240000;

setInterval(function(){
    vote(main_candidat_id);
}, main_time);

//setInterval(function(){
//    vote(second);
//}, second_time);
//
//setInterval(function(){
//    vote(third);
//}, second_time);

//phantom.exit();




