var jsSrc;
chrome.runtime.getPackageDirectoryEntry(function(root) {
  return root.getFile('js/auto-player.js', {
    create: false
  }, function(ap) {
    return ap.file(function(file) {
      var reader = new FileReader();
      reader.onload = function(e){
        jsSrc = reader.result;
      };
      reader.readAsText(file,'utf-8');
    });
  });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getUrlList"){
      sendResponse({urlList: localStorage.urlList});
    }else{
      sendResponse({});
    }
});

chrome.tabs.onUpdated.addListener(
  function(tabId,info,tab){
    if(info.status == 'complete' && tab.url.indexOf('dotinstall.com/lessons/') > 0){
      var match = tab.url.match(/^(https?:\/\/dotinstall\.com\/lessons\/)([^\/\?#]+)(\/|\?|#)?([0-9\?]+)?(\/popup)?$/);
      var popupFlg  = (match[5]) ? true : false ;
      var movieFlg  = (match[4]) ? true : false ;
      var skipFlg   = (match[3]) ? true : false ;
      var searchFlg = (match[2]=='search') ? true : false ;
      if(popupFlg){
        redirectUrl = match.slice(1,6).join('') ;
        chrome.tabs.sendRequest(tabId, {redirectUrl: redirectUrl}, function(response) {});
      }
      else if(movieFlg){
        chrome.tabs.sendRequest(tabId, {jsSrc: jsSrc}, function(response) {});
      }
      else if(!searchFlg && skipFlg){
        chrome.tabs.sendRequest(tabId, {action: 'skipListPage'}, function(response) {});
      }
    }
  }
);