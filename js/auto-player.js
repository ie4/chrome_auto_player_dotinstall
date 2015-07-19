(function(vjs){ vjs('videojs_player',{}).ready(function(){
  var headPos = $(".page-header").offset().top - 10 ;
  var listIndex = 0 ;
  $('body').animate({ scrollTop: headPos });
  this.play();
  this.on('ended', function() {
    var isDone = function(){
      return $('#lesson_row_'+$('#lesson_id').val()).find('a.lesson_title').hasClass('done');
    };
    var next = function(){
      if(isDone()){
        var nextUrl = $('.videoCommands a')[3].href;
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
        location.href = nextUrl ;
      }else{
        window.setTimeout(next, 500);
      }
    };
    if(!isDone()){
      $('#lesson-complete-button').trigger('click');
    }
    next();
  });
}); })(window.videojs);