/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

define(['jquery', 'skeletor.core'],function ($, Skeletor){

	function Accordion(element, options) {
		Accordion.__super__.call(this, element, options, Accordion.DEFAULTS);
	}

	Accordion.VERSION = '0.1.0';
	Accordion.DEFAULTS =  {}

	Skeletor.Plugin.create(Accordion, {
		id: null,
		headers: [],
		_init: function() {
			var self = this;

			this.$element.attr('role', 'tablist');
			this.$element.each(function(index){
				self._construct($(this), index)
			})
		},
		_construct: function($this, index){
			var uid = this.uuid + '-' + index; //Generate unique ID based of instance UUID and index of element

			$this.find('.accordion__header').each(function(index){
				$(this).attr({
					"role": "tab",
					"aria-controls": uid+"-section-" + index,
					"aria-expanded": "false",
					"aria-selected": "false"
				});
			});

			$this.find('.accordion__section').each(function(index){
				$(this).attr({
					"role": "tabpanel",
					"labelledby": uid+"-section-" + index,
				});
			});

		}
	});

});
