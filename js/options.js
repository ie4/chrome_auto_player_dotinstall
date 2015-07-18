$(function(){
  var urlList = localStorage.urlList ;
  if(!urlList){ urlList = ''; }
  $('#urlList').val(urlList.split(',').join("\n"));
  $('#save').click(function() {
    urlList = $('#urlList').val() ;
    localStorage.urlList = urlList.split(/\r\n|\r|\n/).filter(
      function(item, index){
        if(item.indexOf("http://")==0){
          return true ;
        }
      }
    );
    $('#message').css('display','inline');
    setTimeout(function(){
      $('#message').fadeOut();
    }, 1000);
  });
});
