
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
  }, 
  {
    name: "Fog",
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
    name: "Thunder",
    actions: {
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
            interval: 500
          },
          "4": {
            state: "toggle",
            interval: 500
          },
          duration: 10000,
          delay: 3000
        }
      ]
    }
  }
];

