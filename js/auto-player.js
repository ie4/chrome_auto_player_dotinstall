(function(vjs){ vjs('videojs_player',{}).ready(function(){
  var headPos = $(".page-header").offset().top - 10 ;
  var listIndex = 0 ;
  $('body').animate({ scrollTop: headPos });
  this.play();
  this.on('ended', function() {
    var isDone = function(){
      return $('#lesson_row_'+$('#lesson_id').val()).find('a.lesson_title').hasClass('done');
    };
    var checkUrl = function(nextUrl){
      if(!nextUrl && urlList.length > 0){
        var currentListIndex = null ;
        var nextListIndex = 0 ;
        var currentUrl = window.location.href ;
        var match = currentUrl.match(/\/([^\/]+)\/\d+$/);
        var currentLesson = match[1];
        urlList.forEach( function(element, index, array){
          var match = element.match(/\/([^\/]+)(\/)?(\d+)?$/);
          if(match && match[1] == currentLesson){
            currentListIndex = index ;
          }
        });
        if(currentListIndex !== null){
          nextListIndex = currentListIndex + 1 ;
          if( nextListIndex == urlList.length ){
            nextListIndex = 0 ;
          }
        }
        nextUrl = urlList[nextListIndex]+'?';
      }
      return nextUrl;
    };
    var next = function(){
      var vCmdList = $('.videoCommands a');
      var nextUrl = vCmdList[vCmdList.length-1].href;
      if(vCmdList.length>3){
        location.href = checkUrl(nextUrl);
      }else{
        if(isDone()){
          location.href = checkUrl(nextUrl);
        }else{
          window.setTimeout(next, 500);
        }
      }
    };
    if(!isDone()){
      $('#lesson-complete-button').trigger('click');
    }
    next();
  });
}); })(window.videojs);
