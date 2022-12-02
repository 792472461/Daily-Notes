class UnionFind {
	constructor() {
		this.parent = [];
	}

	get size() {
		return this.parent.length;
	}

	// 查找过程，查找元素p所对应的集合编号
	// O(h)的时间复杂度，h为树的高度
	_find(p) {
		if (p >= this.size || p < 0) return;
		while (p !== this.parent[p]) {
			p = this.parent[p];
		}
		return p;
	}

	// 查看元素p和元素q是否属于一个集合
	isConnected(p, q) {
		return this._find(p) === this._find(q);
	}

	// 合并元素p和元素q的集合
	// O(h)的时间复杂度，h为树的高度
	unionElement(p, q) {
		const pRoot = this._find(p);
		const qRoot = this._find(q);
		if (qRoot === pRoot) return;
		this.parent[pRoot] = qRoot;
	}
}

const uf = new UnionFind();
for (let i = 0; i < 10; i++) {
	uf.unionElement(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
}
console.log(uf.parent);
