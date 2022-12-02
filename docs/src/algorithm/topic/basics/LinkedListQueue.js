class Node {
	constructor(e, next) {
		this.e = e;
		this.next = next;
	}
}
class LinkedListQueue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = null;
	}

	isEmpty() {
		return this.size === 0;
	}

	enqueue(e) {
		if (this.tail === null) {
			this.tail = new Node(e);
			this.head = this.tail;
		} else {
			this.tail.next = new Node(e);
			this.tail = this.tail.next;
		}
		this.size++;
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const retNode = this.head;
		this.head = this.head.next;
		retNode.next = null;
		if (this.head === null) {
			this.tail = null;
		}
		this.size--;
		return retNode;
	}

	getFront() {
		if (this.isEmpty()) return null;
		return this.head.e;
	}

	toString() {
		if (this.isEmpty()) return '';
		let res = 'Queue: front ';

		let cur = this.head;
		while (cur) {
			res += cur.e + '->';
			cur = cur.next;
		}
		res += 'NULL';
		return res;
	}
}

const q = new LinkedListQueue();

for (let i = 0; i < 10; i++) {
	q.enqueue(i);
	console.log(q.toString());
}

console.log(q.dequeue().e + '出队');
console.log(q.dequeue().e + '出队');
console.log(q.dequeue().e + '出队');

console.log(q.toString());
