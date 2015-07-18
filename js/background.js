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
chrome.tabs.onUpdated.addListener(
  function(tabId,info,tab){
    chrome.tabs.sendRequest(tabId, {jsSrc: jsSrc}, function(response) {});
  }
);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getUrlList"){
      sendResponse({urlList: localStorage.urlList});
    }else{
      sendResponse({});
    }
});
