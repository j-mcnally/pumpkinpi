class RelayHandler
  _gpio: null
  gpio: (->
    @_gpio || require("gpio")
  )()
  _relays: []
  getRelay: (pin, callback) ->
    return callback(@_relays[pin]) if @_relays[pin]?
    @_relays[pin] = @gpio.export(pin,
      direction: "in",
      ready: ->
        callback(@)
    )

  switchOn: (relay) ->
    console.log "Switching relay ##{relay} ON"
    @getRelay(relay, (pin) ->
      pin.setDirection("out")
    )

  switchOff: (relay) ->
    console.log "Switching relay ##{relay} OFF"
    @getRelay(relay, (pin) ->
      pin.setDirection("in")

    )

class Module
  scenes: []
  _manager: null
  constructor: (scenes) ->
    @scenes = scenes
    @manager = @_manager || new RelayHandler()


  run_audio: (scene) ->
    util=require('util')
    exec=require('child_process').exec;
    sounds = scene.actions.sounds
    _.each(sounds, (sound) ->
      console.log(sound)
      (->
        console.log(process.cwd())
        soundfile = _.keys(sound)[0]
        delay = sound[soundfile]      
        timer = setTimeout(->
          exec "mpg123 #{process.cwd()}/assets/sfx/#{soundfile}", (error, stdout, stderr) ->
              console.log('stdout: ' + stdout)
              console.log('stderr: ' + stderr)
              unless error?
                console.log('exec error: ' + error)
        , delay)
        timer.unref()
      )()
    )


  run: (scene) ->

    manager = @manager
    scene = scene.toLowerCase()
    scene_schedule = @
    scene = _.find(@scenes, (val) ->
      val.name.toLowerCase() == scene
    );
    return unless scene?
    @run_audio(scene)

    # Setup Relays
    timers = {}
    relays = scene.actions.relays
    if relays?
      phase_id = 0
      _.each relays, (phase) ->
        phase = require('util')._extend({}, phase); #If we dont dupe the object the duration is deleted, forever....
        duration = phase.duration
        delay = phase.delay 
        delete phase.duration
        delete phase.delay
        timers[phase_id] = []
        _.each _.keys(phase), (relay) ->
          (->
            phaseDelay = delay || 1
            dPhase = phase_id
            phaseDelayTimer = setTimeout(->
              pin = parseInt(relay)
              control = phase[relay]
              if (control instanceof Object)
                if control.state == "on"
                  if control.duration?
                    if control.delay?
                      wait = control.delay
                    else
                      wait = 1
                    (->
                      curPhase = dPhase
                      waitTimer = setTimeout(->
                        manager.switchOn(pin)
                        mytimer = setTimeout(->
                          manager.switchOff(pin)
                        , control.duration)
                        mytimer.unref()
                        timers[curPhase].push(mytimer)
                      , wait)
                      waitTimer.unref()
                      timers[curPhase].push(waitTimer)
                    )()             
                  else
                    manager.switchOn(relay)
                else if (control.state == "toggle")
                  (->
                    relayIsOn = false
                    flipper = setInterval(->
                      if relayIsOn
                        manager.switchOff(pin)
                        relayIsOn = false
                      else
                        manager.switchOn(pin)
                        relayIsOn = true
                    , control.interval)
                    flipper.unref()
                    timers[dPhase].push(flipper)
                  )()
                else
                  manager.switchOff(relay)
              else
                if (control == "off")
                  manager.switchOff(pin)
                else
                  manager.switchOn(pin)
            , phaseDelay);
          )();
        if duration? || delay?
          duration = duration || 0
          delay = delay || 0
          console.log "Scheduled to end in #{duration} miulliseconds || Phase : #{phase_id}"
          (->
            curPhase = phase_id
            phase_timeout = setTimeout(->
              _.each(timers[curPhase], (timer)->
                if timer?
                  console.log(timer)
                  clearInterval(timer)
                  clearTimeout(timer)
              )
              console.log("Phase timeout:: #{curPhase}")
              scene_schedule.run("default")
            , duration + delay)
          )()
        phase_id = phase_id + 1







module.exports = Module