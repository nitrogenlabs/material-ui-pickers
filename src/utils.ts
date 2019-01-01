/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const fillInDigit = (number: number, digit: number) => {
  const max = Math.pow(10, digit);
  let clean = (number % max).toString();
  while(clean.length < digit) {
    clean = `0${clean}`;
  }
  return clean;
};

export const sameDay = (dateA, dateB) => {
  if(dateA !== undefined && dateB !== undefined) {
    return dateA.getDate() === dateB.getDate()
      && dateA.getMonth() === dateB.getMonth()
      && dateA.getFullYear() === dateB.getFullYear();
  }

  return false;
};
