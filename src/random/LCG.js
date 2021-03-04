//@ts-check
import { timeInt } from "../utils/utils";

// @ref : https://en.wikipedia.org/wiki/Linear_congruential_generator
// @ref : https://rosettacode.org/wiki/Linear_congruential_generator : BSD formula

class LCG {
    /**
     * From ref BSD formula  mod : 2**32, mult : 214013, inc : 2531011
     * @param {Object} param0
     */
    constructor({ seed = timeInt(), mod = 2 ** 32, mult = 214013, inc = 2531011 }) {
        this.seed = seed;
        this.mod = mod;
        this.mult = mult;
        this.inc = inc;
    }

    /**
     * Genere un nombre entre [0 et 2**32]
     * @returns {Number}
     */
    randomInt() {
        this.seed = (this.seed * this.mult + this.inc) % this.mod;
        return this.seed;
    }

    /**
     * Return un chiffre randome entre 0 et 1
     * @return {Number}
     */
    randomFloat() {
        return this.randomInt() / this.mod;
    }

    /**
     * Return float entre min et max
     * ref : https://stackoverflow.com/questions/1064901/random-number-between-2-double-numbers
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    randomFloatRange(min, max) {
        return min + this.randomFloat() * (max - min);
    }

    /**
     * Return float entre min et max
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    randomIntRange(min, max) {
        return Math.floor(this.randomFloatRange(min, max));
    }

    get params() {
        return [this.seed, this.mod, this.mult, this.inc];
    }
}

export default LCG;
