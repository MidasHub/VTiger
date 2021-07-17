jQuery(document).ready(function() {
    setTimeout(function () {
        initData_VTEMobile();
    }, 500);
});

function initData_VTEMobile() {
    var userAgent = navigator.userAgent;
    var ios = /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
    var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
    if(mobile){
        window.location.href='modules/VTEMobile';
    }
}