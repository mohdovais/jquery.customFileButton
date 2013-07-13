(function ($) {
  "use strict";
	$.fn.customFileUploader = function (options) {
		var settings = $.extend({}, $.fn.customFileUploader.defaults, options);
		return this.each(function () {
			var $this = $(this),
			o = $this.data() ? $.extend({}, settings, $this.data()) : settings,
			setText,
			removeFile,
			wrapper,
			label,
			button;
			$this.css({
				visibility : 'hidden',
				width : 0,
				height : 0,
				position : 'absolute'
			});
			$this.wrap('<span class="' + o.wrapper_class + '" style="position: relative"/>');
			wrapper = $this.parent('span');
			wrapper.append('<button class="' + o.button_class + '">' + o.button_text + '</button>');
			wrapper.append('<label class="' + o.label_class + '"/>');
			label = wrapper.children('label');
			button = wrapper.children('button');
			setText = function (e) {
				var filename = $this.val().split('/').pop().split('\\').pop();
				label.html(filename + '<a href="#" style="color: red; text-decoration: none" class="close"> &times</a>');
				label.children('a.close').on('click', removeFile).focus();
			};
			removeFile = function (e) {
				e.preventDefault();
				e.stopPropagation();
				label.empty();
				if ($.browser.msie) {
					label.siblings('input').replaceWith(label.siblings('input').clone(true));
					$this = label.siblings('input');
				} else {
					label.siblings('input').val('');
				}
			};
			$this.on('change', setText);
			button.on('click', function () {
				$this.trigger('click');
			});
			return this;
		});
	};
	$.fn.customFileUploader.defaults = {
		wrapper_class : 'customFileUploader-wrapper',
		label_class : 'customFileUploader-label',
		button_class : 'customFileUploader-button',
		button_text : 'Attach File'
	};
}(jQuery));
