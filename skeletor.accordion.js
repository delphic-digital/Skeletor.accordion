/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

define(['jquery', 'velocity', 'skeletor.core'],function ($, Velocity, Skeletor){

	function Accordion(element, options) {
		Accordion.__super__.call(this, element, options, Accordion.DEFAULTS);
	}

	Accordion.VERSION = '0.1.0';
	Accordion.DEFAULTS =  {
		duration: 200,
		easing: 'swing',
		open: $.noop,
		opened: $.noop,
		close: $.noop,
		closed: $.noop
	}

	Skeletor.Plugin.create(Accordion, {
		id: null,
		headers: [],
		_init: function() {
			var self = this;

			this.$element.attr({
				'role':'tablist',
				'aria-multiselectable': true
			});
			this.$element.each(function(index){
				var $this = $(this),
				    uid = self.uuid + '-' + index, //Generate unique ID based of instance UUID and index of element
				    $items = $this.find('.accordion__item'),
				    $headers = $this.find('.accordion__header'),
				    $sections = $this.find('.accordion__section');

				//$this.addClass(uid);

				self._setAriaLabels($headers, $sections, uid)
				self._bindEvents($items)
			})
		},

		_setAriaLabels: function($headers, $sections, uid){

			$headers.each(function(index){
				$(this).attr({
					"role": "tab",
					"aria-controls": uid+"-section-" + index,
					"aria-expanded": "false",
					"aria-selected": "false"
				});
			});

			$sections.each(function(index){
				$(this).attr({
					"role": "tabpanel",
					"labelledby": uid+"-section-" + index,
					"aria-hidden": "true"
				});
			});

		},

		_bindEvents: function($items) {
			var self = this;
			$items.on('click.skeletor.accordion', function(e){
				self._toggle($(this));
			})
		},

		_toggle: function($item){
			this[$item.hasClass('accordion__item--opened') ? 'close' : 'open']($item);
		},

		open: function($item){
			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			this.closeAll($item);

			Velocity
				.animate($section, 'slideDown', {
					begin: function() {},
					duration: this.options.duration,
					easing: this.options.easing,
					complete: function() {
						$item
							.addClass('accordion__item--opened');
						$header
							.attr({
								"aria-expanded": "true",
								"aria-selected": "true"
							});
						$section
							.attr({
								"aria-hidden": "false",
							});
					}
				});
		},

		close: function($item){
			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			Velocity
				.animate($section, 'slideUp', {
					begin: function() {},
					duration: this.options.duration,
					easing: this.options.easing,
					complete: function() {
						$item
							.removeClass('accordion__item--opened');
						$header
							.attr({
								"aria-expanded": "false"
							});
						$section
							.attr({
								"aria-hidden": "true",
							});
					}
				});
		},

		closeAll: function($item) {
			var self = this;
			$item.siblings('.accordion__item--opened').each(function() {
				self.close($(this));
			});
		},
	});

});
