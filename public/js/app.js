$(() => {

  const $modalImage = $('.modalImage');
  const $modal = $('.modal');
  const $modalbutton = $('.modal-close');

  var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor('.editable');

  $modalImage.on('click', (event)=>{
    const imageId = event.target.id;
    $(`.${imageId}`).addClass('is-active');
  });
  $modalbutton.on('click', ()=>{
    $modal.removeClass('is-active');
  });
});
