/**
 * 取消按钮点击事件
 ***/
document.getElementById('cancel').onclick = function(){
    window.close();
};

/**
 * 确认按钮点击事件
 ***/
document.getElementById('ok').onclick = function(){
    var msg = '';
    var validateTag = true;
    if (validateTag && document.getElementById('name').value === '') {
        document.getElementById('name').style.borderColor = '#FF0000';
        msg = chrome.i18n.getMessage("validationNameNoEmpty");
        validateTag = false;
    }
    if (validateTag && document.getElementById('server').value === '') {
        document.getElementById('server').style.borderColor = '#FF0000';
        msg = chrome.i18n.getMessage("validationServerNoEmpty");
        validateTag = false;
    }

    if (validateTag && document.getElementById('name').value.length > 20) {
        document.getElementById('name').style.borderColor = '#FF0000';
        msg = chrome.i18n.getMessage("validationNameLength");
        validateTag = false;
    }

    document.getElementById('warn-msg').innerText = msg;

    if (validateTag) {
        document.getElementById('li-warn').style.visibility = 'hidden';
        localStorage.setItem('name', document.getElementById('name').value);
        localStorage.setItem('server', document.getElementById('server').value);
        chrome.runtime.sendMessage({
            cmd: "init"
        });
        chrome.notifications.clear('personal_config');
        window.close();
    } else {
        document.getElementById('li-warn').style.visibility = 'visible';
    }
};

/**
 * 初始化
 ***/
if (localStorage.getItem('name')) {
    document.getElementById('name').value = localStorage.getItem('name');
}

if (localStorage.getItem('server')) {
    document.getElementById('server').value = localStorage.getItem('server');
}

console.log(chrome.i18n.getMessage("labelName"));

document.getElementById('label_name').innerText = chrome.i18n.getMessage("labelName");
document.getElementById('label_server').innerText = chrome.i18n.getMessage("labelServer");
document.getElementById('name').placeholder = chrome.i18n.getMessage("placeholderName");
document.getElementById('server').placeholder = chrome.i18n.getMessage("placeholderServer");
document.getElementById('ok').value = chrome.i18n.getMessage("buttonOK");
document.getElementById('cancel').value = chrome.i18n.getMessage("buttonCancel");