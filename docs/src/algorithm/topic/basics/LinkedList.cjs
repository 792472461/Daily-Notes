class Node {
	constructor(e, next) {
		this.e = e;
		this.next = next;
	}

	toString() {
		let res = '';
		let cur = this;
		while (cur !== null) {
			res += cur.e + '->';
			cur = cur.next;
		}
		res += 'NULL';
		return res;
	}
}

/**
 * 链表
 */
class LinkedList {
	constructor() {
		// 这里借助了虚拟头节点
		this.dummyHead = new Node(null, null);
		this.size = 0;
	}

	// 返回head头节点
	get head() {
		return this.dummyHead.next;
	}

	// 获取链表长度
	getSize() {
		return this.size;
	}

	// 判断链表是否为空
	isEmpty() {
		return this.getSize() === 0;
	}

	// 新增元素
	add(e, index) {
		if (index < 0 || index > this.size) throw new Error('索引' + index + '出错');
		// 这里借助了虚拟头节点
		let prev = this.dummyHead;
		for (let i = 0; i < index; i++) {
			prev = prev.next;
		}
		prev.next = new Node(e, prev.next);
		this.size++;
	}

	// 在链表头添加一个元素
	addFirst(e) {
		this.add(e, 0);
	}

	// 在链表结尾添加元素
	addLast(e) {
		this.add(e, this.size);
	}

	// 获取链表第index个元素
	get(index) {
		if (index < 0 || index > this.size) throw new Error('索引' + index + '出错');
		let cur = this.dummyHead.next;
		for (let i = 0; i < index; i++) {
			cur = cur.next;
		}
		return cur.e;
	}

	// 获取第一个元素
	getFirst() {
		this.get(0);
	}

	// 获取最后一个元素
	getLast() {
		this.get(this.size - 1);
	}

	// 修改链表中第index个元素为e
	set(e, index) {
		if (index < 0 || index > this.size) throw new Error('索引' + index + '出错');
		let cur = this.dummyHead.next;
		for (let i = 0; i < index && cur !== null; i++) {
			cur = cur.next;
		}
		cur.e = e;
	}

	// 查找链表中是否含有元素e
	contains(e) {
		let cur = this.dummyHead.next;
		while (cur) {
			if (cur.e === e) return true;
			cur = cur.next;
		}
		return false;
	}

	// 删除链表中第index位置的元素
	delete(index = 0) {
		if (index < 0 || index > this.size) throw new Error('索引' + index + '出错');
		let prev = this.dummyHead;
		for (let i = 0; i < index; i++) {
			prev = prev.next;
		}
		const ret = prev.next;
		prev.next = ret.next;
		this.size--;
		return ret;
	}

	// 删除第一个元素
	deleteFirst() {
		return this.delete(0);
	}

	// 删除最后一个元素
	deleteLast() {
		return this.delete(this.size - 1);
	}

	toString() {
		let res = '';
		let cur = this.dummyHead.next;
		while (cur !== null) {
			res += cur.e + '->';
			cur = cur.next;
		}
		res += 'NULL';
		return res;
	}
}

// // 测试链表程序
// const linkedList = new LinkedList()

// for (let i = 0; i < 10; i++) {
//   // 添加元素
//   linkedList.addFirst(i)
// }

// // 删除元素
// linkedList.delete(5)
// console.log(linkedList.getSize(), linkedList.toString())

// linkedList.deleteLast()
// console.log(linkedList.getSize(), linkedList.toString())

module.exports = {
	LinkedList,
	Node
};
