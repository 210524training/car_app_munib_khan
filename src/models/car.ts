// Name
// Price
// Position
// Stock

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type Position = `${Letter}${Digit}`
export function isPosition(value: string): value is Position {
  return /^[A-F][0-9]$/.test(value);
}

export default class Car {
  constructor(
    public name: string = '',
    public price: number = 0,
    public position: Position = 'A0',
    public stock: number = 0,
    public year: number = 1990
  ) { }
}