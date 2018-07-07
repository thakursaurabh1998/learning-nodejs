const request = require("request");

const location = (address, callback) => {
  const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}`;
  request(
    {
      url,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to google server');
      } else if (body.status === "ZERO_RESULTS") {
        callback("Your entered location is invalid, please enter a valid loacation.");
      } else if (body.status === "OVER_QUERY_LIMIT") {
        callback('Query limit reached');
      } else if (body.status === "OK") {
        const location = body.results[0].geometry.location;
        const formatted_address = body.results[0].formatted_address;
        callback(undefined, {
          location,
          formatted_address
        });
      }
      // console.log(JSON.stringify(body, undefined, 2));
    }
  );
};

module.exports = {
  location
};
