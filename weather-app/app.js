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

location.location(argv.address, (error, result) => {
  if (error) console.log(error);
  else if (result) {
    const location = result;
    weather.weather(result.location, (error, result) => {
      if (error) console.log(error);
      else if (result) {
        console.log(`Results for location: ${location.formatted_address}`);
        console.log(`${result}°C`);
      }
    });
  }
});
