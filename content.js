element = document.createElement("script");
element.innerHTML = "(function(vjs){ vjs('videojs_player',{}).ready(function(){\
  this.play();\
  this.on('ended', function() {\
    var isDone = function(){\
      return $('#lesson_row_'+$('#lesson_id').val()).find('a.lesson_title').hasClass('done');\
    };\
    var next = function(){\
      if(isDone()){\
        location.href = $('.videoCommands a')[3].href;\
      }else{\
        window.setTimeout(next, 500);\
      }\
    };\
    if(!isDone()){\
      $('#lesson-complete-button').trigger('click');\
    }\
    next();\
  });\
}); })(window.videojs);";
document.body.appendChild(element);
