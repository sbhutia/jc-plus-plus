(function($) {
    "use strict"; // Start of use strict
  
    $('#find-jobs').click(function(){
      $.ajax({
        url: "/testData/data.json",
        data: "data",
        success: function(response){
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
