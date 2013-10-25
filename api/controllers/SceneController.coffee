gpio = require("gpio")
module.exports =
  show: (req, res) ->
    SceneController = require("../../libs/scene_parser")
    scene_controller = new SceneController(sails.config.scenes)
    scene_controller.run(req.params.id)

    res.json hello: "success"

  kill: (req, res) ->
    SceneController = require("../../libs/scene_parser")
    scene_controller = new SceneController(sails.config.scenes)
    scene_controller.run('Default')

    res.json status: "success"

  _config: {}