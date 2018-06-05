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

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});
