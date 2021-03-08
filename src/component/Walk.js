import LCG from "../random/LCG";
import Node from "./Node";

class Walk {
    constructor(n) {
        this.n = n;
        this.unnasigned = [];
        this.pos = [width / 2, height / 2];
        this.path = [];
        this.random = new LCG({});
        this.feed = [];
        this.init();
        // P5js function clear canvas
        clear();
    }

    init() {
        for (let i = 0; i < this.n; i++) this.unnasigned.push(new Node());
        let node = this.unnasigned.shift();
        node.setPos(this.pos.toString());
        this.path.push(node);
    }

    isComplete() {
        return this.unnasigned.length == 0 ? true : false;
    }

    isValid(node) {
        return !this.path.some((el) => el.pos === node);
    }

    assigne(node) {
        this.path.push(node);
        this.unnasigned.splice(this.unnasigned.indexOf(node), 1);
    }

    unnasigne(node) {
        this.unnasigned.push(node);
        this.path.splice(this.path.indexOf(node), 1);
    }

    getDomainValues(node) {
        return node.domain;
    }

    selectUnasignedVariable() {
        return this.unnasigned[0];
    }

    selfAvoidingWalk() {
        if (this.isComplete()) return true;

        let node = this.selectUnasignedVariable();

        for (var value of node.domain) {
            let random = this.random.randomIntRange(0, node.domain.length);

            let position = this.getPosition(node.domain[random]);

            if (this.isValid(position)) {
                let save = new Array(...node.domain);

                node.dir = node.domain[random];
                node.setPos(position);
                node.domain.splice(random, 1);
                this.assigne(node);
                this.pos = node.getIntPos();

                let succes = false;

                succes = this.selfAvoidingWalk();

                if (succes) {
                    return true;
                } else {
                    node.domain = save;
                    this.unnasigne(node);
                    this.pos = this.path[this.path.length - 1].getIntPos();
                }
            }
        }
    }

    randomWalk() {
        let posibleDir = [-2, -1, 1, 2];

        for (let i = 0; i < this.n; i++) {
            let dir = posibleDir[this.random.randomIntRange(0, posibleDir.length)];
            let pos = this.getPosition(dir);
            let node = new Node(dir, pos);
            this.path.push(node);
            this.pos = node.getIntPos();
        }
        this.render();
    }

    nonReversingWalk() {
        let last = Number.MIN_SAFE_INTEGER;
        let posibleDir = [-2, -1, 1, 2];

        for (let i = 0; i < this.n; i++) {
            // Logic
            let dir = posibleDir[this.random.randomIntRange(0, posibleDir.length)];
            while (dir == last * -1) {
                dir = posibleDir[this.random.randomIntRange(0, posibleDir.length)];
            }
            last = dir;

            // Node
            let pos = this.getPosition(dir);
            let node = new Node(dir, pos);
            this.path.push(node);
            this.pos = node.getIntPos();
        }
        this.render();
    }

    getPosition(number) {
        switch (number) {
            case 1:
                return this.moveUp();
            case 2:
                return this.moveLeft();
            case -2:
                return this.moveRight();
            case -1:
                return this.moveDown();
        }
    }

    moveUp() {
        return [this.pos[0], this.pos[1] + 10].toString();
    }

    moveDown() {
        return [this.pos[0], this.pos[1] - 10].toString();
    }

    moveRight() {
        return [this.pos[0] + 10, this.pos[1]].toString();
    }

    moveLeft() {
        return [this.pos[0] - 10, this.pos[1]].toString();
    }

    drawNodeLine(node) {
        let [x, y] = node.getIntPos();
        switch (node.dir) {
            case 1:
                return line(x, y, x, y - 10);
            case 2:
                return line(x, y, x + 10, y);
            case -2:
                return line(x, y, x - 10, y);
            case -1:
                return line(x, y, x, y + 10);
            default:
                break;
        }
    }

    clear() {
        this.feed.map((el) => clearTimeout(el));
    }

    render() {
        // Rendering part
        this.path.map((el, index) => {
            var feed = setTimeout(() => {
                this.drawNodeLine(el);
            }, 30 * index);
            this.feed.push(feed);
        });
    }
}

export default Walk;
