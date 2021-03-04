import LCG from "../random/LCG";
import { deepCopy } from "../utils/utils";
import Node from "./Node";

class March2 {
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
        node.domain = [-2, -1, 1, 2];
        this.unnasigned.push(node);
        this.path.splice(this.path.indexOf(node), 1);
    }

    getDomainValues(node) {
        return node.domain;
    }

    /**
     * @returns {Node}
     */
    selectUnasignedVariable() {
        return this.unnasigned[0];
    }
    selfAvoidingWalk() {
        if (this.isComplete()) return true;

        let node = this.selectUnasignedVariable();

        for (var value of node.domain) {
            let random = this.random.randomIntRange(0, node.domain.length);

            let direction = this.getDirection(node.domain[random]);

            if (this.isValid(direction)) {
                // tampon
                node.dir = node.domain[random];
                node.setPos(direction);
                node.domain.splice(random, 1);
                this.assigne(node);
                this.pos = node.getIntPos();

                let succes = false;

                succes = this.selfAvoidingWalk();

                if (succes) {
                    return true;
                } else {
                    this.unnasigne(node);
                    this.pos = this.path[this.path.length - 1].getIntPos();
                }
            }
        }
    }

    getDirection(number) {
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
        this.path = [];
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

export default March2;
