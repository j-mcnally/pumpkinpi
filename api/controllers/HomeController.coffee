module.exports =
  index: (req, res) ->
    return res.view
      scenes: sails.config.scenes

  _config: {}