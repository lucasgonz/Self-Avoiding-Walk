import LCG from "../random/LCG";

class March {
    constructor(n, c) {
        this.n = n;
        this.c = c;
        this.initalDrawPos = { x1: width / 2, y1: height / 2, x2: width / 2, y2: height / 2 };
        this.drawPos = { x1: width / 2, y1: height / 2, x2: width / 2, y2: height / 2 };
        this.currentPos = { x: width / 2, y: height / 2 };
        this.path = [];
        this.lcg = new LCG({});
        this.feed = [];
        clear();
    }

    randomWalk() {
        let posibleDir = [-2, -1, 1, 2];
        for (let i = 0; i < this.n; i++) this.path.push(posibleDir[this.lcg.randomIntRange(0, 4)]);
        this.render();
    }

    nonReversingWalk() {
        let last = undefined;
        let posibleDir = [-2, -1, 1, 2];
        // Generate liste of Directions
        for (let i = 0; i < this.n; i++) {
            let direction = posibleDir[this.lcg.randomIntRange(0, 4)];
            while (direction == last * -1) direction = posibleDir[this.lcg.randomIntRange(0, 4)];
            this.path.push(direction);
            last = direction;
        }
        this.render();
    }

    selfAvoidingWalk() {
        let visited = [JSON.stringify({ ...this.currentPos })];
        let posibleDir = [-2, -1, 1, 2];
        let step;

        for (step = 0; step < this.n; step++) {
            let rand = this.lcg.randomIntRange(0, posibleDir.length);

            let previus = Object.assign({}, this.currentPos);
            let direction = this.getDirection(posibleDir[rand], false);

            while (visited.includes(JSON.stringify(direction))) {
                posibleDir.splice(rand, 1);
                this.currentPos = previus;
                rand = this.lcg.randomIntRange(0, posibleDir.length);
                direction = this.getDirection(posibleDir[rand], false);

                // Case stuck
                if (posibleDir.length == 0) {
                    return { stuck: true, step: step };
                }
            }
            visited.push(JSON.stringify({ ...direction }));
            this.path.push(posibleDir[rand]);
            posibleDir = [-2, -1, 1, 2];
        }
        this.path = this.path.concat(this.path.reverse());
        this.drawPos = this.initalDrawPos;
        this.render();
        return { stuck: false, step: step };
    }

    getDirection(number, draw = true) {
        switch (number) {
            case 1:
                return this.moveUp(draw);
            case 2:
                return this.moveLeft(draw);
            case -2:
                return this.moveRight(draw);
            case -1:
                return this.moveDown(draw);
        }
    }

    moveUp(draw = true) {
        this.drawPos.y2 += 10;
        if (draw) line(this.drawPos.x1, this.drawPos.y1, this.drawPos.x2, this.drawPos.y2);
        this.drawPos.y1 = this.drawPos.y2;
        this.currentPos.y = this.drawPos.y1;
        return this.currentPos;
    }

    moveDown(draw = true) {
        this.drawPos.y2 -= 10;
        if (draw) line(this.drawPos.x1, this.drawPos.y1, this.drawPos.x2, this.drawPos.y2);
        this.drawPos.y1 = this.drawPos.y2;
        this.currentPos.y = this.drawPos.y1;
        return this.currentPos;
    }

    moveRight(draw = true) {
        this.drawPos.x2 += 10;
        if (draw) line(this.drawPos.x1, this.drawPos.y1, this.drawPos.x2, this.drawPos.y2);
        this.drawPos.x1 = this.drawPos.x2;
        this.currentPos.x = this.drawPos.x1;
        return this.currentPos;
    }

    moveLeft(draw = true) {
        this.drawPos.x2 -= 10;
        if (draw) line(this.drawPos.x1, this.drawPos.y1, this.drawPos.x2, this.drawPos.y2);
        this.drawPos.x1 = this.drawPos.x2;
        this.currentPos.x = this.drawPos.x1;
        return this.currentPos;
    }

    clear() {
        this.feed.map((el) => clearTimeout(el));
        this.path = [];
    }

    render() {
        // Rendering part
        this.path.map((el, index) => {
            var feed = setTimeout(() => {
                this.getDirection(el);
            }, 30 * index);
            this.feed.push(feed);
        });
    }
}

export default March;
