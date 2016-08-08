var ajax = function (cfg) {
    var type = cfg.type;
    var url = cfg.url;
    var data = cfg.data;
    var success = cfg.success;

    var xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        if (XMLHttpRequest.DONE == this.readyState && this.status == 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.errMsg) {
                console.log(data.errMsg);
            } else {
                success(data);
            }
        } else {
            console.log('网络异常，请稍后再试。');
        }
    };
    xhr.ontimeout = onerror;
    xhr.open(type, url, true);
    xhr.setRequestHeader('accept', 'application/json');
    if (type.toUpperCase() == 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.setRequestHeader('contentType', 'application/json;charset=utf-8');
        xhr.send(data);
    } else {
        xhr.send(null);
    }
};

module.exports = ajax
