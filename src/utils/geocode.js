const request = require("request");
const geocode = function (address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxpMTk5OWEyNCIsImEiOiJjbGphY2Q1emowM2o2M2lraTZtcjd0end4In0.6j_B_DsAFwCLOkv3RhEHpQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("the connetion to the geocoding is failed", undefined);
    } else if (body.features.length === 0) {
      callback("the address that you provide is undefiend", undefined);
    } else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const loc = body.features[0].place_name;
      const cord = lat + "," + long;
      callback(undefined, { cord, loc });
    }
  });
};
module.exports = geocode;
