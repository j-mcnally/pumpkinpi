
module.exports.scenes = [
  {
    name: "Default",
    actions: {
      relays: [{
        "2": "on",
        "4": "on",
        "17": "off",
        "3": "off"
      }]
    }
  }, {
    name: "Thunder",
    actions: {
      relays: [
        {
          "2": "off",
          "4": "off",
          "3": "off",
          "17": {
            state: "on",
            duration: 5000
          }
        }, {
          "2": {
            state: "toggle",
            interval: 500
          },
          "4": {
            state: "toggle",
            interval: 500
          },
          "3": "on",
          duration: 10000,
          delay: 2000
        }
      ]
    }
  }
];

