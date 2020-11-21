class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
//get了的话要移到头部，set了的话要从后面移入并且把最久未使用的数据值去掉，并写入他
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.hashTable = {};
    this.count = 0;
    this.dummyHead = new ListNode();
    this.dummyTail = new ListNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }
  get(key) {
    let node = this.hashTable[key];
    if (node == null) return -1;
    //被读取了，所以该节点要移到链表的头部
    this.moveToHead(node);
    return node.value;
  }
  put(value) {
    let node = this.hashTable[key];
    if (node == null) {
      let newNode = new ListNode(key, value);
      //存进哈希表
      this.hashTable[key] = newNode;
      //放到链表的头部
      this.addToHead(newNode);
      this.count++;
      if (this.count > this.capacity) {
        this.removeItem();
      }
    } else {
      node.value = value;
      this.moveToHead(node);
    }
  }
  removeFromList(node) {
    let tempPrev = node.prev;
    let tempNext = node.next;
    tempPrev.next = tempNext;
    tempNext.prev = tempPrev;
  }
  addToHead(node) {
    node.prev = this.dummyHead;
    node.next = this.dummyHead.next;
    this.dummyHead.next.prev = node;
    this.dummyHead.next = node;
  }

  //清除多余的
  removeItem() {
    let tail = this.proTail();
    delete this.hashTable[tail.key];
    this.count;
  }

  proTail() {
    let tailItem = this.dummyTail.prev();
    this.removeFromList(tailItem);
    return tailItem;
  }
}
