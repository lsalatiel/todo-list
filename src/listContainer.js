import List from './list.js';

class ListContainer {
    constructor() {
        this.listArray = [];
    }
    
    addList(title) {
        if(this.listArray.some((item) => item.getTitle() === title)) { return 0 };
        let list = new List(title);
        this.listArray.push(list);
        return list;
    }
    
    removeList(list) {
        this.listArray = this.listArray.filter((item) => item !== list);
    }
    
    getLists() {
        return this.listArray;
    }
}

export default ListContainer;
