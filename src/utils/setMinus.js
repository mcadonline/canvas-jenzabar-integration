import { difference, differenceWith } from 'ramda';

export default function setMinus(collectionA, collectionB, idKeyName) {
  if (!idKeyName) {
    return difference(collectionA, collectionB);
  }

  const idsAreEqual = (x, y) => x[idKeyName] === y[idKeyName];
  return differenceWith(idsAreEqual, collectionA, collectionB);
}
