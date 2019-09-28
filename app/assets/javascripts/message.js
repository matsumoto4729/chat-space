$(document).on('turbolinks:load', function() {
  $(function(){  
    function buildHTML(message) {  
      image = (message.image === null) ? "" :  
                    `<img src="${message.image}"  
                    class="lower-message__image">  
                    `  
  
      var html = `<div class="message">  
                    <div class="upper-message">  
                      <div class="upper-message__user-name">  
                        ${message.user_name}  
                      </div>  
                      <div class="upper-message__date">  
                        ${message.created_at}  
                      </div>  
                    </div>  
                    <div class="lower-message">  
                      <p class="lower-message__content">  
                        ${message.text}  
                      </p>  
                    </div>  
                    ${image}  
                 `  
      return html;  
    }  
  
    $("#new-message").on("submit", function(e){  
      e.preventDefault();  
      var formData = new FormData(this);  
      var url = $(this).attr("action")  
      $.ajax({  
        url: url,  
        type: "POST",  
        data: formData,  
        dataType: "json",  
        processData: false,  
        contentType: false  
      })  
      .done(function(data){  
        var html = buildHTML(data);  
        $(".messages").append(html)  
        $(".lower-message__image").css('max-height','300px');  
        $(".lower-message__image").css('max-width','300px');  
        $('#new-message')[0].reset()  
        $('.js-messages').animate({scrollTop: $('.js-messages')[0].scrollHeight});  
      })  
      .fail(function(){  
        alert("error");  
      })  
      .always(function() {  
        $('.form__submit').prop('disabled',false);  
      })  
    })  
  });
});