
module.exports.scenes = [
  {
    name: "default",
    duration: 500,
    actions: {
      relays: [{
        "2": "on",
        "4": "on",
        "17": "off",
        "3": "off"
      }]
    }
  }, 
  {
    name: "fog",
    duration: 6000,
    actions: {
      relays: [
        {
          "17": {
            state: "on",
            duration: 6000
          }
        }
      ]
    }
  },
  {
    name: "thunder",
    duration: 17000,
    actions: {
      sounds: [
        {"50579^thunder.mp3": 1000},
        {"21805^EvilNoize1.mp3": 1},
        {"83291^evilaff.mp3": 8500},
        {"50579^thunder.mp3": 9000}
      ],
      relays: [
        {
          "2": "off",
          "4": "off",
          "3": "on",
          "17": {
            state: "on",
            duration: 6000
          }
        }, {
          "2": {
            state: "toggle",
            interval: 300
          },
          "4": {
            state: "toggle",
            interval: 300
          },
          duration: 14000,
          delay: 3000
        }
      ]
    }
  }
];

