/**
 * @file
 * Defines Javascript behaviors for the cookies module.
 */;

(function (Drupal, $) {
  'use strict';

  /**
   * Define defaults.
   */
  Drupal.behaviors.cookies_gtag = {

    activate: function () {
      var $script = $('script#cookies_gtag');
      $script.each(function() {
        var newScript = document.createElement('script');
        newScript.innerHTML = this.innerHTML;
        $.each(this.attributes, function( index, attr ) {
          if (attr.name !== 'type') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        this.parentNode.replaceChild(newScript, this);
      })
    },

    attach: function (context) {
      var self = this;
      document.addEventListener('cookiesjsrUserConsent', function (event) {
        var service = (typeof event.detail.services === 'object') ? event.detail.services : {};
        if (typeof service['gtag'] !== 'undefined' && service['gtag']) {
          self.activate(context);
        }
      });
    }
  }
})(Drupal, jQuery);
