#PumpkinPi

PumpkinPi is a sails application designed to run on the RaspberryPi and take advantage of its GPIO pins.

It makes heavy usage of the GPIO package for gaining access to physical hardware and toggling pin voltages high and low.

The goal of pumpkin pi was originally to run a small triggerable lighting show for out halloween party.

One of the goals of the project was to be able to provide a list of scenes that could be described as json and expose a web interface that could be accessed from a mobile phone to trigger the scenes defined in JSON.

The main custom development other than the sails routing and basic controller actions are.

[Scene Config file](https://github.com/j-mcnally/pumpkinpi/blob/master/config/scenes.js)

[Scene Parser](https://github.com/j-mcnally/pumpkinpi/blob/master/libs/scene_parser/index.coffee)

One of the major hurdles was timers being killed when the request would finish so we make heavy usage of Timer.unref() to leak the timers so that they are not destroyed at the end of the request. These leaks may impact performace and as this is a WIP we hope to resolve them, or find a way to shell out to run scenese where execution wouldnt be terminated by the request ending.


Co-Authored by: https://github.com/lrdiv
