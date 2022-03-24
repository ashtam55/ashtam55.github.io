"use strict";

window.eventEmitter = new EventEmitter();

// init
$(function(){
  eventEmitter.emit('init');
});


// modal
(function($){
  eventEmitter.once('init', init);
  eventEmitter.on('open-modal', openModal);
  eventEmitter.on('close-modal', closeModal);

  let $modal;
  let $modalBox;
  let $focus;
  
  function init() {
    $(document.body).append('<div class="js-modal modal hidden"><div class="js-modal__box modal__box"></div></div>');
    $(document.body).on('keydown', event => {
      if (event.which === 27) {
        closeModal();
      }
    });
    $modal = $('.js-modal');
    $modalBox = $('.js-modal__box');
  }
  
  /*
   *  - Takes either a function that returns a string of HTML or a settings object
   *    - if an object
   *      - settings.markup = function that returns markup to go inside the modal
   *      - settings.event = an event to listen for on the modal (optional)
   *      - settings.listener = a function to run when the event is fired (optional)
   *      - settings.focus = a selector of whatever element should receive focus when the modal is open (optional)
   */
  function openModal(settings) {
    if (typeof settings === 'function') {
      var settings = {
        markup: settings
      }
    }
    
    if (!(settings.markup)) return;
    
    $modalBox.append(settings.markup());
    settings.event && $modalBox.one(settings.event, settings.listener);
    $modal.show();
    
    // shift focus and return it later
    $focus = $(':focus').blur();
    settings.focus && $modalBox.find(settings.focus).focus();
  }
  
  /*
   *  closes the modal, clears it contents, and returns focus to where it was previously
   */
  function closeModal() {
    $modal.hide();
    $modalBox.html('');
    $focus.focus();
  }
})(jQuery);


// app
(function($){
  const $BUTTON1 = $('.js-one');
  const $BUTTON2 = $('.js-two');
  const $BUTTON3 = $('.js-three');
  
  
  $BUTTON1.on('click', event => {
    const modalSettings = {
      markup: generateRegistrationForm,
      event: 'submit',
      listener: function(event) {
        event.preventDefault();
        event.stopPropagation();
        eventEmitter.emit('close-modal');
      },
      focus: '#username'
    }
    
    eventEmitter.emit('open-modal', modalSettings);
  });
  
  $BUTTON2.on('click', event => {
    const modalSettings = {
      markup: generateGibberish,
      event: 'click',
      listener: function(event) {
        event.stopPropagation();
        if (event.target.id === 'js-btn') {
          eventEmitter.emit('close-modal');
        }
      },
      focus: "#js-btn"
    }
    
    eventEmitter.emit('open-modal', modalSettings);
  });
  
  $BUTTON3.on('click', event => {
    eventEmitter.emit('open-modal', () => '<h2>Three</h2>');
  });
  
  
  function generateRegistrationForm() {
    return `<form class="js-form" id="js-form">
              <label for="username">Username:</label><input type="text" id="username" name="username">
              <label for="password">Password:</label><input type="password" id="password" name="pasword">
              <button>Login</button>
            </form>`;
  }
  
  function generateGibberish() {
    return `<p>Tempor magna mollit consequat. Velit non aliquip anim laboris aliquip nulla cillum et sunt enim ut tempor deserunt ut culpa dolor ut mollit officia occaecat officia magna consectetur et consectetur duis veniam, velit quis et voluptate velit ipsum quis consequat. Irure deserunt anim eu anim ea excepteur in quis adipisicing eu nulla irure sint in in dolore labore quis eni.</p><button id="js-btn" type="button">Ok</button>`;
  }
})(jQuery);