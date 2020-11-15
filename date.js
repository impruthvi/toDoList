//jshint esversion:6
exports.getDate = function () {
  const today = new Date();

  const options = {
    day: "numeric",
    weekday: "long",
    month: "long",
  };

  return today.toLocaleDateString("eg-US", options);
};

exports.getDay = function () {
    const today = new Date();

  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("eg-US", options);
};
