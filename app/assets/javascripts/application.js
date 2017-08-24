/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()


  if(document.querySelectorAll('.expanding-area')) {
      document.querySelectorAll('.expanding-area').forEach(function(ex) {
          ex.addEventListener('click', expandCells);
      });
  }

  function expandCells() {
      var self = this;
      document.querySelectorAll('.expandable').forEach(function(item) {
              item.classList.add('js-hidden');
      });
      document.querySelectorAll('.' + this.dataset.target).forEach(function(item) {
          if(item.classList.contains('js-hidden')) {
              item.classList.remove('js-hidden');
          } else {
              item.classList.add('js-hidden');
          }
      });
  }

  if(document.querySelectorAll('.clickable-row')) {
      document.querySelectorAll('.clickable-row').forEach(function(tr) {
          tr.addEventListener('click', submitForm);
      });
  }

  function submitForm() {
      document.getElementById('_id').value = this.id;
      document.getElementById('tableForm').submit();
  }




});
