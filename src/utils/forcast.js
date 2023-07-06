const request = require("request");
const forcast = function (cord, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=8a6d6648a345739397fa3be679ffc9e4&query=" +
    encodeURIComponent(cord) +
    "";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("the connection to the location failed", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const data = body.current;

      const temp =
        "the temp is: " +
        data.temperature +
        " and feel like : " +
        data.feelslike;
      callback(undefined, temp);
    }
  });
};

module.exports = forcast;
