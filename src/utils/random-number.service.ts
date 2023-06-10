/// Move to pure function !!!!!!
export class RandomNumberService {
  static get(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
