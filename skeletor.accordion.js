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
		easing: 'swing'
	}

	Skeletor.Plugin.create(Accordion, {
		$items: [],
		$headers: [],
		$sections: [],
		_init: function() {

			this.$element.attr({
				'role':'tablist',
				'aria-multiselectable': true
			});

			this.$items  = this.$element.find('.accordion__item'),
			this.$headers  = this.$element.find('.accordion__header'),
			this.$sections = this.$element.find('.accordion__section');

			this._setAriaLabels();
			this._bindEvents();
		},

		_setAriaLabels: function(){
			var self = this;

			this.$headers.each(function(index){
				$(this).attr({
					"role": "tab",
					"aria-controls": self.uuid+"-section",
					"aria-expanded": "false",
					"aria-selected": "false"
				});
			});

			this.$sections.each(function(index){
				$(this).attr({
					"role": "tabpanel",
					"labelledby": self.uuid+"-section",
					"aria-hidden": "true"
				});
			});

		},

		_bindEvents: function() {
			var self = this;
			this.$headers.on('click.skeletor.accordion', function(e){
				self._toggle($(this).closest('.accordion__item'));
			})
		},

		_toggle: function($item){
			this[$item.hasClass('accordion__item--opened') ? 'close' : 'open']($item);
		},

		open: function($item){
			var $header = $item.find('.accordion__header'),
			    $section = $item.find('.accordion__section');

			this.closeAll();

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
								"aria-expanded": "true"
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

		closeAll: function() {
			var self = this;
			this.$element.find('.accordion__item--opened').each(function() {
				self.close($(this));
			});
		},
	});

});
