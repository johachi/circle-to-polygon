function getLatBetweenPoints(coordinate1, coordinate2) {
  const [x1, y1] = coordinate1;
  const [x2, y2] = coordinate2;

  const k = (y2 - y1) / (x2 - x1);
  const m = y1 - k * x1;

  const GMT = x1 >= 0 ? 180 : -180;

  return k * GMT + m;
}

exports.getLatBetweenPoints = getLatBetweenPoints;

function makeValidCoordinate(coordinate) {
  let [lng, lat] = coordinate;

  if (lat > 90 && lat > -90) {
    const decider = Math.floor(lat / 90);

    if (decider % 2 === 0) {
      lat = -(lat - 180 * (decider - 1));
      lng = lng > 0 ? lng - 180 : lng + 180;
    } else {
      lat = -(lat - 180 * decider);
      lng = lng > 0 ? lng - 180 : lng + 180;
    }
  } else if (lat < -90) {
    const decider = Math.ceil(lat / 90);

    if (decider % 2 === 0) {
      lat = -(lat - 180 * (decider + 1));
      lng = lng > 0 ? lng - 180 : lng + 180;
    } else {
      lat = -(lat - 180 * decider);
      lng = lng > 0 ? lng - 180 : lng + 180;
    }
  }

  if (lat === -0) lat = 0;
  if (lng === -0) lng = 0;

  return [lng, lat];
}

exports.makeValidCoordinate = makeValidCoordinate;
