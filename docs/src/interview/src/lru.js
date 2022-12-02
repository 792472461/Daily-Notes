function Node(val, next = null, pre = null) {
	this.val = val;
	this.key = null;
	this.pre = next;
	this.next = pre;
}

/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
	this.h = new Map();
	this.head = new Node();
	this.tail = new Node();
	this.head.next = this.tail;
	this.tail.pre = this.head;
	this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
	// 没有就返回-1
	if (!this.h.get(key)) return -1;
	// 如果存在
	const node = this.h.get(key);
	this.remove(node);
	this.insert(this.head, node);
	return node.val;
};

LRUCache.prototype.remove = function (node) {
	node.pre.next = node.next;
	node.next.pre = node.pre;
};

LRUCache.prototype.insert = function (p, node) {
	p.next.pre = node;
	node.next = p.next;
	p.next = node;
	node.pre = p;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
	if (!this.h.get(key)) {
		const node = new Node(value);
		// 存储一下这个key
		node.key = key;
		this.h.set(key, node);
		this.insert(this.head, node);
		if (this.h.size > this.capacity) {
			this.h.delete(this.tail.pre.key);
			// 删除最后一个
			this.remove(this.tail.pre);
		}
	} else {
		const node = this.h.get(key);
		node.val = value;
		// 从链表中删除
		this.remove(node);
		// 加到最前面
		this.insert(this.head, node);
	}
};
