$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    var image = "";

    image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";

    var html = 
                  `<div class='upper-message clearfix' data-message-id="$(message.id)">
                  <div class='upper-message__user-name'>
                      ${message.name}
                  </div>
                  <div class='upper-message__date'>
                      ${message.created_at}
                  </div>
                  <div class='lower-message'>
                      <p>${message.content}</p>
                      ${image}
                  </div>
              </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('#message_content').val('')
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });
});
});