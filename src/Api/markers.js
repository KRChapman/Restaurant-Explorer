const basePaddle = "http://maps.google.com/mapfiles/kml/paddle/"
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
const whiteMarker = 'wht-circle.png';
const purpleMarker = 'purple-stars.png';

  const defaultMarker = {
   url: basePaddle + purpleMarker,
  // The origin for this image is (0, 0).
  origin: new window.google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new window.google.maps.Point(0, 22),

  // This marker is 20 pixels wide by 32 pixels high.
  size: new window.google.maps.Size(20, 22),
  scaledSize: new window.google.maps.Size(18, 18)

}

  const selectedMarker = {
  url: basePaddle + whiteMarker,
  // The origin for this image is (0, 0).
  origin: new window.google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new window.google.maps.Point(0, 22),

  // This marker is 20 pixels wide by 32 pixels high.
  size: new window.google.maps.Size(20, 22),
  scaledSize: new window.google.maps.Size(18, 18)

}
const markers = { 'selected': selectedMarker, 'default': defaultMarker }
export default markers;

