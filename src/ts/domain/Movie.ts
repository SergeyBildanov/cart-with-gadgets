import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly author: string,
        readonly price: number,
        readonly year: number,
        readonly country: string,
        readonly slogan: string,
        readonly genres: string[],
        readonly length: number,
    ) { }
}