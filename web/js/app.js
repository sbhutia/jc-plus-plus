(function($) {
    "use strict"; // Start of use strict
  
    $('#find-jobs').click(function(){
      $('.loading').show();
      $.ajax({
        url: "/api/jobSearch",
        data: {"name" : $('#user-name').val(), "desc" : $('#about-user').val()},
        success: function(response){
            console.log(JSON.stringify(response));
            $( response.jobMatches ).each(function( index, jobItem ) {
              console.log( index + ": " + JSON.stringify($( this )) );
              $("#job-cards").append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><div class="caption"><h3>Job Name : '+ 
                                     jobItem.jobTitle + '</h3><p>Job Description : '+
                                     jobItem.jobDescription +'</p><p>Match percentage : '+
                                     jobItem.jobMatch + '</p><p><a href="#" class="btn btn-primary" role="button" data-toggle="modal" data-target="#myModal">Apply</a></p></div></div>');
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
        
        return;
      }
    final_transcript = '';
    recognition.lang = 'en-GB';
    recording = true;
    recognition.start();    
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
