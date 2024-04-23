import List from './list.js';

class ListContainer {
    constructor() {
        this.listArray = [];
    }
    
    addList(title) {
        let list = new List(title);
        this.listArray.push(list);
        return list;
    }
    
    removeList(list) {
        // this.listArray = this.listArray.filter((item) => item !== list);
        this.listArray.splice(list, 1);
    }
    
    getLists() {
        return this.listArray;
    }
}

export default ListContainer;
