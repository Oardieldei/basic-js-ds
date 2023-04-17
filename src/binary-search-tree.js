const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
	constructor() {
		this.rootVal = null
	}

	root() {
		return this.rootVal
	}

	add(data) {
		let node = new Node(data)
		if (this.rootVal) {
			this.addNode(this.rootVal, node)
		} else {
			this.rootVal = node
		}
	}

	addNode(node, newNode) {
		if (node.data > newNode.data) {
			node.left ? this.addNode(node.left, newNode) : node.left = newNode
		} else {
			node.right ? this.addNode(node.right, newNode) : node.right = newNode
		}
	}

	has(data, node = this.rootVal) {
		if (node) {
			if (node.data > data) {
				return this.has(data, node.left)
			} else if (node.data < data) {
				return this.has(data, node.right)
			} else {
				return true
			}
		}
		return false
	}

	find(data, node = this.rootVal) {
		if (node) {
			if (node.data > data) {
				return this.find(data, node.left)
			} else if (node.data < data) {
				return this.find(data, node.right)
			} else {
				return node
			}
		}
		return null
	}

	remove(data) {
		this.rootVal = this.removeNode(this.rootVal, data)
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

	min(node = this.rootVal) {
		return node.left ? this.min(node.left) : node.data
	}

	max(node = this.rootVal) {
		return node.right ? this.max(node.right) : node.data
	}

}

module.exports = {
	BinarySearchTree
};