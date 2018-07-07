const request = require("request");

const weather = (location, callback) => {
  const url = `https://api.darksky.net/forecast/3d7ad9eabf1e384c239f4c0edd42acee/${
    location.lat
  },${location.lng}?units=si&exclude=minutely,hourly,daily`;
  request(
    {
      url,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to Weather API server");
      } else if(body) {
        callback(undefined,body.currently.temperature);
      }
    }
  );
};

module.exports = {
  weather
}