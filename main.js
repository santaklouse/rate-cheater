/**
 * Created with JetBrains PhpStorm.
 * User: santa
 * Date: 17.04.13
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */

/**
main: Елизавета Шатохина КПУ //id: 640

second: Анна Ионова ЗГИА //id: 632
        Ксения Плющ ЗНТУ //id: 642

 phantomjs main.js 640 632 642

 Usage: main.js <main_candidat_id> <second> <third> <main_time(in seconds)> <second_time>
*/


var vote = function(candidat_id) {
    var page;

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
        'id': candidat_id
    };

    page.open(currentPage, function(status) {
        if (status === 'success') {
            page.clearCookies();
            page.deleteCookie('PHPSESSID');
            window.setTimeout(function() {
                page.evaluate(function(args){
                    var log = function(type, data) {
                        console.log(type+' vote for '+args.id);
                        console.log(JSON.stringify(data));
                    };

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
                            log('success', data);
                        },
                        'error': function(data) {
                            log('error', data);
                        }
                    });
                }, params);
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

if (phantom.args.length < 3) {
    console.log('Usage: main.js <main_candidat_id> <second> <third> <main_time(in mseconds(optional))> <second_time(optional)>');
    phantom.exit();
}

var main_candidat_id = getArg(0);
var main_time = getArg(3) || 60000;
var second = getArg(1);
var third = getArg(2);

var second_time = getArg(4) || 240000;

setInterval(function(){
    vote(main_candidat_id);
}, main_time);

setInterval(function(){
    vote(second);
    vote(third);
}, second_time);
