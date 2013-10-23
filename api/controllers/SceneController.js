/**
 * SceneController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var gpio = require 'gpio';

var gpio2;

gpio2 = gpio.export(2, {

});

module.exports = {
    
  
  show: function(req, res) {
    return res.json({
      gpio2.set();
    });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SceneController)
   */
  _config: {}

  
};
