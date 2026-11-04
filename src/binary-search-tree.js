const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this._root = null
	}

	root() {
		return this._root
	}

	add(data) {
		if (this._root === null) {
			const newNode = new Node(data)
			this._root = newNode
			return
		}

		let current = this._root
		let parent = null

		while ((current !== null) && (current.data !== data)) {
			parent = current
			if (data > current.data) {
				current = current.right
			} else {
				current = current.left
			}
		}

		if (current === null) {
			const newNode = new Node(data)
			if (data > parent.data) {
				parent.right = newNode
			} else {
				parent.left = newNode
			}
		}
	}

	find(data) {
		let current = this._root

		while ((current !== null) && (current.data !== data)) {
			if (data > current.data) {
				current = current.right
			} else {
				current = current.left
			}
		}

		if (current === null) return null
		return current
	}

	has(data) {
		return this.find(data) !== null
	}

	remove(data) {
		let current = this._root
		let parent = null

		while ((current !== null) && (current.data !== data)) {
			parent = current
			if (data > current.data) {
				current = current.right
			} else {
				current = current.left
			}
		}

		if (current === null) return

		if ((current.left !== null) && (current.right !== null)) {
			let successorParent = current
			let successor = current.right

			while (successor.left !== null) {
				successorParent = successor
				successor = successor.left
			}

			current.data = successor.data
			current = successor
			parent = successorParent
		}

		const child = current.left || current.right

		if (parent === null) {
			this._root = child
		} else if (parent.left === current) {
			parent.left = child
		} else {
			parent.right = child
		}
	}

	min() {
		let current = this._root

		while ((current !== null) && (current.left !== null)) {
			current = current.left
		}

		if (current === null) return null
		return current.data
	}

	max() {
		let current = this._root

		while ((current !== null) && (current.right !== null)) {
			current = current.right
		}

		if (current === null) return null
		return current.data
	}
}

module.exports = {
	BinarySearchTree
};
