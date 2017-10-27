(function($) {
    "use strict"; // Start of use strict
  
    $('#find-jobs').click(function(){
      $('.loading').show();
      $.ajax({
        method: "GET",
        url: "/api/jobSearch",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        data: {"name" : $('#user-name').val(), "desc" : $('#about-user').val()},
        success: function(response){
            
            var parsedResponse = response;
            console.log(JSON.stringify(parsedResponse));
            $( parsedResponse.jobMatches ).each(function( index, jobItem ) {
              console.log( index + ": " + JSON.stringify($( this )) );
              
              var match;
              
              if(jobItem.correlation < 2){
                match = "High"
              } else if (jobItem.correlation < 3){
                match = "Medium"
              }else{
                match = "Low"
              }
              $("#job-cards").append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3>Job Name : '+ 
                                     jobItem.job_title + '</h3><p class="description">Job Description : '+
                                     jobItem.description +'</p><p>Match : '+
                                     match + '</p><p><a href="#" class="btn btn-primary" role="button" data-toggle="modal" data-target="#myModal">Apply</a></p></div></div>');
            });
          
            $( parsedResponse.personality).each(function( index, personalityItem ) {
              console.log( index + ": " + JSON.stringify($( this )) );
              $("#personality-attributes").append('<div class="row"><div class="col-lg-2"><strong>'+ personalityItem.name +'</strong></div><div class="col-lg-4"><div class="progress"><div class="progress-bar" role="progressbar" style="width: '+ personalityItem.percentile * 100+'%;">'+ personalityItem.percentile * 100+'%</div></div></div></div>');
            });       
            
            $('.loading').hide();
            $('#user-profile').hide();
            $('#job-results').show();
        },
      });
    });
  
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  
  var recording = false,
      final_transcript;
  
  $('#record-about-user').click(function(){
      if(recording){
        recognition.stop();
        $('#record-about-user').css("color", "black");
        return;
      }
    final_transcript = '';
    recognition.lang = 'en-GB';
    recording = true;
    recognition.start();
    $('#record-about-user').css("color", "red");
  });
  
  recognition.onerror = function(event) {
  };

  recognition.onend = function() {
    recording = false;
  };
  
  recognition.onresult = function(event) {
    var interim_transcript = '';
    var first_char = /\S/;
    
    function capitalise(s) {
      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalise(final_transcript);
    $('#about-user').val(final_transcript);
    //interim_span.innerHTML = linebreak(interim_transcript);
  };

})(jQuery); // End of use strict
