gpio = require("gpio")
SceneController = require("../../libs/scene_parser")

module.exports =
  show: (req, res) ->
    scene_controller = new SceneController(sails.config.scenes)
    scene_controller.run(req.params.id)

    res.json hello: "success"

  kill: (req, res) ->
    scene_controller = new SceneController(sails.config.scenes)
    scene_controller.run('Default')

    res.json status: "success"

  _config: {}
