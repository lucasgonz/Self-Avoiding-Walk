//@ts-check
import LCG from "../random/LCG";
import { getLCGparams } from "../utils/utils";

class Dice {
    /**
     * @param {Number} sides
     */
    constructor(sides = 6) {
        /** @type {Number}*/ this.sides = sides;
        /** @type {LCG}*/ this.random = new LCG(getLCGparams());
        // prettier-ignore
        /** @type {Array<Number>}*/ this.prob_comb_side6 = 
        [1/36, 2/36, 3/36, 4/36,5/36, 6/36, 5/36, 4/36, 3/36, 2/36, 1/36]
    }

    /**
     * Genere un nombre aleatoir entre 1 et nb sides
     * @returns {Number} */
    roll() {
        return this.random.randomIntRange(1, this.sides + 1);
    }
}

export default Dice;
