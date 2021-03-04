//@ts-check
import { zip } from "../utils/utils";

class Khi2 {
    /**
     * Effectue le teste du Khi2 sur les valeurs observed et attendues
     * @param {Array<Number>} observed
     * @param {Array<Number>} attendue
     * @returns {Number}*/
    execute(observed, attendue) {
        let result = 0;
        let arr = zip(observed, attendue);
        for (var [obs, att] of arr) result += (obs - att) ** 2 / att;
        return result;
    }
}

export default Khi2;
