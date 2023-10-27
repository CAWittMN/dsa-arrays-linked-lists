/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");
    if (idx === 0) return this.head.val;
    if (idx === this.length - 1) return this.tail.val;
    let current = this.head.next;
    let count = 1;
    while (current) {
      if (count === idx) return current.val;
      current = current.next;
      count++;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");
    if (idx === 0) {
      this.head.val = val;
    } else if (idx === this.length - 1) {
      this.tail.val = val;
    } else {
      let current = this.head.next;
      let count = 1;
      while (current) {
        if (count === idx) {
          current.val = val;
          break;
        }
        current = current.next;
        count++;
      }
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw new Error("Invalid index");
    if (idx === 0) {
      this.unshift(val);
    } else if (idx === this.length) {
      this.push(val);
    } else {
      const newNode = new Node(val);
      let current = this.head.next;
      let count = 1;
      while (current) {
        if (count === idx) {
          newNode.next = current;
          newNode.prev = current.prev;
          current.prev.next = newNode;
          current.prev = newNode;
          break;
        }
        current = current.next;
        count++;
      }
      this.length++;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index");
    let val;
    if (idx === 0) {
      val = this.head.val;
      if (this.head.next === null) {
        this.tail = null;
        this.head = null;
      } else {
        this.head.next.prev = null;
        this.head = this.head.next;
      }
    } else if (idx === this.length - 1) {
      val = this.tail.val;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let current = this.head.next;
      let count = 1;
      while (current) {
        if (count === idx) {
          val = current.val;
          current.prev.next = current.next;
          current.next.prev = current.prev;
          break;
        }
        current = current.next;
        count++;
      }
    }
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) return 0;
    let sum = 0;
    let current = this.head;
    while (current) {
      sum += current.val;
      current = current.next;
    }
    return sum / this.length;
  }

  /** reverse(): reverse the order of the list in place */

  reverse() {
    if (!this.head) return;
    let current = this.head;
    while (current) {
      let temp = current.next;
      current.next = current.prev;
      current.prev = temp;
      current = temp;
    }
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  /** pivot(idx): pivots nodes around value */

  pivot(val) {
    if (!this.head) return;
    let current = this.head;
    let less = new LinkedList();
    let more = new LinkedList();
    while (current) {
      if (current.val < val) {
        less.push(current.val);
      } else {
        more.push(current.val);
      }
      current = current.next;
    }
    less.tail.next = more.head;
    more.head.prev = less.tail;
    this.head = less.head;
    this.tail = more.tail;
  }

  /** mergeSorted(lstA, lstB): Merge Sorted Linked Lists */

  static mergeSorted(lstA, lstB) {
    let merged = new LinkedList();
    let currentA = lstA.head;
    let currentB = lstB.head;
    while (currentA && currentB) {
      if (currentA.val < currentB.val) {
        merged.push(currentA.val);
        currentA = currentA.next;
      } else {
        merged.push(currentB.val);
        currentB = currentB.next;
      }
    }
    while (currentA) {
      merged.push(currentA.val);
      currentA = currentA.next;
    }
    while (currentB) {
      merged.push(currentB.val);
      currentB = currentB.next;
    }
    return merged;
  }
}

module.exports = LinkedList;
