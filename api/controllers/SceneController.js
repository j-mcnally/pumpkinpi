gpio = require("gpio")
module.exports =
  
  show: (req, res) ->
    gpio2 = gpio.export(2,
      direction: "in"
      ready: ->
        timer = setTimeout(->
          gpio2.setDirection "out"
        , 2000)
        timer.ref()
    )
    gpio3 = gpio.export(3,
      direction: "out"
      ready: ->
        timer = setTimeout(->
          gpio3.setDirection "in"
        , 2000)
        timer.ref()
    )
    res.json hello: "world"

  kill: (req, res) ->
    gpio2 = gpio.export(2,
      direction: "in"
    )
    gpio3 = gpio.export(3,
      direction: "in"
    )
    res.json hello: "world"

  
  ###
  Overrides for the settings in `config/controllers.js`
  (specific to SceneController)
  ###
  _config: {}