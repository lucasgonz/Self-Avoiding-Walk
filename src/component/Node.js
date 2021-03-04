class Node {
    constructor() {
        this.dir;
        this.pos = null;
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
