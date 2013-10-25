gpio = require("gpio")
sceneParser = require("../../libs/scene_parser")

module.exports =
  show: (req, res) ->
    scenes = new sceneParser(sails.config.scenes)
    scenes.run(req.params.id)
    res.json status: "success"
  kill: (req, res) ->
    scenes.run("default")

  
  ###
  Overrides for the settings in `config/controllers.js`
  (specific to SceneController)
  ###
  _config: {}