var url = window.location.href ;
if (url.indexOf('/popup')>0){
  var windowWidth  = window.innerWidth ;
  var windowHeight = window.innerHeight + 130 ;
  resizeTo(windowWidth,windowHeight);
  window.location.href = url.replace('/popup','') ;
}
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    appendScript(request.jsSrc);
  }
);
function appendScript(jsSrc){
  script = document.createElement("script");
  script.innerHTML = jsSrc ;
  document.body.appendChild(script);
}