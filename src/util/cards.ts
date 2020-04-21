import { Card } from "../store/deck/types";

const SUIT_SEQUENCE = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
const VALUES_SEQUENCE = [
  "2",
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
];

interface RankMap {
  [key: string]: number;
}

const factorial = (n: number): number => {
  let f = 1;
  let numbers: number[] = [];

  for (let i = 0; i < n; i++) {
    numbers.push(n - i);
  }

  numbers.forEach((number) => {
    f *= number;
  });

  return f;
};

export const orderCardsByRotation = (cards: Card[], rotation: Card): Card[] => {
  const suitRanks: RankMap = {};

  const suitCount = SUIT_SEQUENCE.length;
  const indexOfSuitRotation = SUIT_SEQUENCE.indexOf(rotation.suit);

  for (let i = 0; i < suitCount; i++) {
    const suit = SUIT_SEQUENCE[(i + indexOfSuitRotation) % suitCount];
    suitRanks[suit] = suitCount - i;
  }

  const valueRanks: RankMap = {};

  const valueCount = VALUES_SEQUENCE.length;
  const indexOfValueRotation = VALUES_SEQUENCE.indexOf(rotation.value);

  for (let i = 0; i < valueCount; i++) {
    const value = VALUES_SEQUENCE[(i + indexOfValueRotation) % valueCount];
    valueRanks[value] = valueCount - i;
  }

  const compareCards = (a: Card, b: Card) => {
    // this might look a little backwards to a normal compare, but note we're sorting
    // by sequence rankings
    if (suitRanks[a.suit] > suitRanks[b.suit]) {
      return -1;
    } else if (suitRanks[a.suit] < suitRanks[b.suit]) {
      return 1;
    } else {
      if (valueRanks[a.value] > valueRanks[b.value]) {
        return -1;
      } else if (valueRanks[a.value] > valueRanks[b.value]) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const orderedCards = cards.sort(compareCards);

  return orderedCards;
};

export const countFullHouseCombinations = (cards: Card[]): number => {
  let fullHouses = 0;

  const rankMap: RankMap = {};

  cards.forEach((card) => {
    // use value[0], so we dont have to map fully qualified strings to single char codes
    if (card.value[0] in rankMap) {
      rankMap[card.value[0]] += 1;
    } else {
      rankMap[card.value[0]] = 1;
    }
  });

  Object.keys(rankMap).forEach((tripleKey) => {
    if (rankMap[tripleKey] >= 3) {
      // we have the possibility for a full house
      Object.keys(rankMap).forEach((doubleKey) => {
        if (tripleKey !== doubleKey && rankMap[doubleKey] >= 2) {
          // we have a full house, let's count how many combinations

          const tripleCombinations =
            factorial(rankMap[tripleKey]) /
            (factorial(3) * factorial(rankMap[tripleKey] - 3));

          const doubleCombinations =
            factorial(rankMap[doubleKey]) /
            (factorial(2) * factorial(rankMap[doubleKey] - 2));

          fullHouses += tripleCombinations * doubleCombinations;
        }
      });
    }
  });

  return fullHouses;
};

export const findFullHouseCombinations = (cards: Card[]): string[][] => {
  const combinations: string[][] = [];

  // there can't be any full houses without at least 5 cards.
  if (cards.length >= 5) {
  }

  return combinations;
};
