function getLatBetweenPoints(coordinate1, coordinate2) {
  const [x1, y1] = coordinate1;
  const [x2, y2] = coordinate2;

  const k = (y2 - y1) / (x2 - x1);
  const m = y1 - k * x1;

  const GMT = x1 >= 0 ? 180 : -180;

  return k * GMT + m;
}

exports.getLatBetweenPoints = getLatBetweenPoints;

function makeValidLngCoordinate(lng) {
  while (lng > 180) {
    lng = lng - 360;
  }

  while (lng < -180) {
    lng = lng + 360;
  }

  if (lng === -0) lng = 0;

  return lng
}

function makeValidCoordinate(coordinate) {
  let [lng, lat] = coordinate;

  while (lat >= 270) {
    lat = lat - 360;
  }

  if (lat > 90) {
    lng = lng > 0 ? lng - 180 : lng + 180;
    lat = 180 - lat;
  }

  if (lat === -0) lat = 0;
  if (lng === -0) lng = 0;

  return [lng, lat];
}

exports.makeValidCoordinate = makeValidCoordinate;
