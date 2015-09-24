chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if(request.action == "skipListPage"){
      var movieLinks = $("#lessons_list li a") ;
      if(movieLinks.length>0){
        window.location.href = movieLinks[0].href ;
      }
    }else if(request.skipPopup){
      var windowWidth  = window.innerWidth ;
      var windowHeight = window.innerHeight + 130 ;
      resizeTo(windowWidth,windowHeight);
      window.location.href = request.skipPopup ;
    }else if(request.jsSrc){
      appendScript(request.jsSrc);
    }
  }
)

function appendScript(jsSrc){
  script = document.createElement("script");
  script.innerHTML = jsSrc ;
  document.body.appendChild(script);
  chrome.runtime.sendMessage({method:"getUrlList"},function(response) {
    urlList = response.urlList;
    script = document.createElement("script");
    script.innerHTML = "var urlList = '"+urlList+"'.split(',');" ;
    document.body.appendChild(script);
  });
}