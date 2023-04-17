const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	root() {
		return this.root
	}

	add(data) {
		let node = new Node(data)
		if (this.root) {
			this.insertNode(this.root, node)
		} else {
			this.root = node
		}
	}

	insertNode(node, newNode) {
		if (node.data > newNode.data) {
			node.left ? this.insertNode(node.left, newNode) : node.left = newNode
		} else {
			node.right ? this.insertNode(node.right, newNode) : node.right = newNode
		}
	}

	has(data, node = this.root) {
		if (node) {
			if (node.data > data) {
				return this.search(node.left, data)
			} else if (node.data < data) {
				return this.search(node.right, data)
			} else {
				return true
			}
		}
		return false
	}

	find(data, node = this.root) {
		if (node) {
			if (node.data > data) {
				return this.search(node.left, data)
			} else if (node.data < data) {
				return this.search(node.right, data)
			} else {
				return node
			}
		}
		return null
	}

	remove(data) {
		this.root = this.removeNode(this.root, data)
	}

	removeNode(node, data) {
		if (node) {
			if (node.data > data) {
				node.left = this.removeNode(node.left, data)
				return node
			} else if (node.data < data) {
				node.right = this.removeNode(node.right, data)
				return node
			} else {
				if (!node.left && !node.right) {
					return this.removeLeafNode(node)
				}

				if (!node.left) {
					return this.removeNodeWithoutLeftChild(node)
				} else if (!node.right) {
					return this.removeNodeWithoutRightChild(node)
				}

				return this.removeNodeWithTwoChildren(node)
			}
		} else {
			return null
		}
	}

	removeNodeWithTwoChildren(node) {
		const newNode = this.min(node.right)
		node.data = newNode.data
		node.right = this.removeNode(node.right, newNode.data)
		return node
	}

	removeNodeWithoutLeftChild(node) {
		node = node.right
		return node
	}

	removeNodeWithoutRightChild(node) {
		node = node.left
		return node
	}

	removeLeafNode(node) {
		node = null
		return node
	}

	min(node = this.root) {
		return node.left ? this.min(node.left) : node
	}

	max(node = this.root) {
		return node.right ? this.max(node.right) : node
	}

}

module.exports = {
	BinarySearchTree
};