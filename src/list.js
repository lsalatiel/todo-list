import ListItem from './listItem.js';

class List {
    constructor(title) {
        this.listItemArray = [];
        this.title = title;
    }

    addListItem(title, description, dueDate, priority, status) {
        if(this.listItemArray.some((item) => item.getTitle() === title)) { return 0 }
        let listItem = new ListItem(title, description, dueDate, priority, status);
        this.listItemArray.push(listItem);
    }

    removeListItem(listItem) {
        this.listItemArray = this.listItemArray.filter((item) => item !== listItem);
    }

    clearList() {
        this.listItemArray = [];
    }

    getListItems() { return this.listItemArray; }

    getTitle() { return this.title; }

    setTitle(title) { this.title = title; }
}

export default List;
