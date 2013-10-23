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

var gpio = require('gpio');
var gpio2;

gpio2 = gpio.export(2, { direction: "out" });

module.exports = {
    
  show: function(req, res) {
    gpio2.set(function() {
      console.log(gpio2.value);
    });
    setTimeout(gpio2.reset(), 2000);
    return res.json({
      hello: "world"
    });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SceneController)
   */
  _config: {}

  
};
