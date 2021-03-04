class Node {
    constructor(dir = null, pos = null) {
        this.dir = dir;
        this.pos = pos;
        this.domain = [-2, -1, 1, 2];
    }

    setPos(pos) {
        this.pos = pos;
    }

    getIntPos() {
        let [x, y] = this.pos.split(",");
        return [parseInt(x), parseInt(y)];
    }
}

export default Node;
