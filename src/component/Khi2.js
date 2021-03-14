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
        // zip prend deux arr et en forme une ex :
        // [a1 , a2, a3] et [b1, b2, b3] --> [ [a1, b1] , [a2, b2], [a3, b3] ]
        let arr = zip(observed, attendue);
        for (var [obs, att] of arr) result += (obs - att) ** 2 / att;
        return result;
    }
}

export default Khi2;
