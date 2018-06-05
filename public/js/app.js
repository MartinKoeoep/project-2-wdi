$(() => {

  const $modalImage = $('.modalImage');
  const $modal = $('.modal');
  const $modalbutton = $('.modal-close');

  $modalImage.on('click', (event)=>{
    // console.log('click', event.target.id);
    const imageId = event.target.id;
    $(`.${imageId}`).addClass('is-active');
  });
  $modalbutton.on('click', ()=>{
    $modal.removeClass('is-active');
  });
});
