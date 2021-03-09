function timeInt() {
    return Math.round(Date.now() / 1000);
}

function distribute(values) {
    let distributed = {};
    for (var x of values) {
        distributed[x] ? distributed[x].push(x) : (distributed[x] = [x]);
    }
    return distributed;
}

function getEuclideanDistance(pos1, pos2) {
    var a = pos1[0] - pos2[0];
    var b = pos1[1] - pos2[1];
    var distance = Math.sqrt(a * a + b * b);
    return distance;
}

function rootMeanSquare(arr) {
    return Math.floor(Math.sqrt(arr.map((val) => val * val).reduce((acum, val) => acum + val) / arr.length));
}

function zip(arr1, arr2) {
    return arr1.map((e, i) => [e, arr2[i]]);
}

function getLCGparams() {
    let params = ["Seed", "Mod", "Mult", "Inc"];
    params = params.map((el) => document.getElementById(el).value);

    if (params[0] !== "Time()") params[0] = parseInt(params[0]);
    else params[0] = timeInt();
    if (params[1] !== "2**32") params[1] = parseInt(params[1]);
    else params[1] = 2 ** 32;

    return { seed: params[0], mod: params[1], mult: parseInt(params[2]), inc: parseInt(params[3]) };
}

export { timeInt, distribute, zip, getLCGparams, getEuclideanDistance, rootMeanSquare };
