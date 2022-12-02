class MinHeap {
	constructor(arg) {
		if (typeof arg === 'number') {
			this.data = new Array(arg);
		} else if (Array.isArray(arg)) {
			this.data = arg;
			if (arg.length > 1) {
				for (let i = this.parent(arg.length - 1); i >= 0; i--) {
					this.siftDown(i);
				}
			}
		} else {
			this.data = [];
		}
	}

	// 返回堆中的元素个数
	size() {
		return this.data.length;
	}

	// 返回一个布尔值, 表示堆中是否为空
	isEmpty() {
		return this.data.length === 0;
	}

	// 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
	parent(index) {
		if (index === 0) {
			throw new Error(`index-0 doesn't have parent.`);
		}
		return Math.floor((index - 1) / 2);
	}

	// 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
	rightChild(index) {
		return Math.floor(index * 2 + 2);
	}

	// 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
	leftChild(index) {
		return Math.floor(index * 2 + 1);
	}

	// 向堆中添加元素
	add(e) {
		this.data.push(e);
		this.siftUp(this.size() - 1);
	}

	siftUp(k) {
		// !!!
		while (k > 0 && this.data[this.parent(k)] > this.data[k]) {
			this.swap(k, this.parent(k));
			k = this.parent(k);
		}
	}

	// 看堆中的最小元素
	findMin() {
		if (this.size() === 0) {
			throw new Error('Can not findMax when heap is empty.');
		}
		return this.data[0];
	}

	// 取出堆中最小元素
	extractMin() {
		const ret = this.findMin();

		this.swap(0, this.size() - 1);
		this.data.pop();
		this.siftDown(0);

		return ret;
	}

	swap(i, j) {
		const temp = this.data[i];
		this.data[i] = this.data[j];
		this.data[j] = temp;
	}

	// 下沉
	siftDown(k) {
		while (this.leftChild(k) < this.size()) {
			let j = this.leftChild(k); // 在此轮循环中,data[k]和data[j]交换位置
			if (j + 1 < this.size() && this.data[j + 1] < this.data[j]) {
				j++;
			}
			// data[j] 是 leftChild 和 rightChild 中的最小值
			if (this.data[k] <= this.data[j]) {
				break;
			}

			this.swap(k, j);
			k = j;
		}
	}

	// 取出堆中的最小元素，并且替换成元素e
	replace(e) {
		const ret = this.findMin();
		this.data[0] = e;
		this.siftDown(0);
		return ret;
	}

	// 测试函数
	main() {
		const start = new Date().getTime();
		const n = 1000;

		const minHeap = new MinHeap();

		for (let i = 0; i < n; i++) {
			minHeap.add(Math.floor(Math.random() * n * 10));
		}

		const arr = [];
		for (let i = 0; i < n; i++) {
			arr.push(minHeap.extractMin());
		}

		for (let i = 1; i < n; i++) {
			if (arr[i - 1] > arr[i]) {
				throw new Error('Error');
			}
		}

		console.log('Test MinHeap completed.', new Date().getTime() - start + 'ms');
	}
}

module.exports = MinHeap;
