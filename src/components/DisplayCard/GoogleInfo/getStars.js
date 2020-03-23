import halfStar from './../../../assets/google/half.png';
import wholeStar from './../../../assets/google/full.png';
import emptyStar from './../../../assets/google/empty.png';



export function getStarsToDisplay(rating) {
  const multiplier = 10;
  // multiply by 10 to avoid potential floating point errors since javascript numbers are just floats
  const originalRating = rating * multiplier;
  const truncRating = Math.trunc(rating);
  const partialRating = originalRating - truncRating * multiplier;
  const totalStars = 5;
  const starsToDisplay = [];
  // Google shows half stars from .3 to .7
  for (let i = 0; i < totalStars; i++) {
    if (i < truncRating) {
      starsToDisplay.push(wholeStar);
    }
    // when the iteration reaches the last star
    else if (i === truncRating) {
      const partialStar = partialRatingStar(partialRating);
      starsToDisplay.push(partialStar);
    }
    else {
      starsToDisplay.push(emptyStar);
    }
  }
  return starsToDisplay;
}

export function partialRatingStar(partialRating) {
  let star;
  switch (true) {
    case (partialRating >= 8):
      star = wholeStar;
      break;
    case (partialRating >= 3):
      star = halfStar;
      break;
    case (partialRating >= 0):
      star = emptyStar;
      break;
    default:
      star = emptyStar;
      break;
  }
  return star;
}