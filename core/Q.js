class Q {
    constructor() {
        this.head = null;
    }

    add(val) {
        if (!this.head) {
            this.head = new Node(val);
            return;
        }

        let cur = this.head;

        while (cur.next) {
            cur = cur.next;
        }

        cur.next = new Node(val);
        return;
    }

    pull() {
        if (!this.head) return false;
        if (!this.head.next) {
            this.head = null;
            return true;
        }
        this.head = this.head.next;
        return true;
    }

    isEmpty(){
        if (!this.head) return true;
        return false;
    }

    toArray() {
        if (!this.head) return null;

        let cur = this.head;
        let arr = [];
        arr.push(this.head.val);

        while (cur.next) {
            cur = cur.next;
            arr.push(cur.val);
        }

        return arr;
    }
}

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

module.exports = Q;
