/**
 * 访问节点
 * @param {Node} n 节点
 */
function visitNode(n) {
	// eslint-disable-next-line no-undef
	if (n instanceof Comment) {
		console.log('Comment node ---', n.textContent);
	}
	// eslint-disable-next-line no-undef
	if (n instanceof Text) {
		console.log('Text node ---', n.textContent.trim());
	}
	// eslint-disable-next-line no-undef
	if (n instanceof HTMLElement) {
		console.log('HTMLElement Node ---', `<${n.tagName.toLowerCase()}>`);
	}
}

/**
 * 深度优先遍历
 * @param {Node} root 节点
 */
function dfs(root) {
	visitNode(root);
	const childNodes = root.childNodes;
	if (childNodes.length) {
		childNodes.forEach((child) => {
			dfs(child);
		});
	}
}

/**
 * 广度优先遍历
 * @param {Node} root 节点
 */
function bfs(root) {
	const q = []; // 模拟队列
	// 根节点入队
	q.push(root);
	while (q.length) {
		const curNode = q.pop();
		if (curNode === null) break;
		visitNode(curNode);
		const childNodes = curNode.childNodes;
		if (childNodes.length) {
			childNodes.forEach((child) => {
				q.unshift(child);
			});
		}
	}
}

console.log(dfs(document.getElementById('app')));
console.log(bfs(document.getElementById('app')));
