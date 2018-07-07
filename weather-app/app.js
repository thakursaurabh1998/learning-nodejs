const location = require("./location");
const weather = require("./weather");

const yargs = require("yargs");

argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      description: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

location
  .location(argv.address)
  .then(data => weather.weather(data))
  .then(({ temperature, address }) => {
    console.log(`Results for location: ${address}`);
    console.log(`${temperature}°C`);
  })
  .catch(error => {
    console.log(error);
  });
