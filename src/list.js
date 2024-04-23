import ListItem from './listItem.js';

class List {
    constructor(title) {
        this.listItemArray = [];
        this.title = title;
    }

    addListItem(title, description, dueDate, priority, status) {
        let listItem = new ListItem(title, description, dueDate, priority, status);
        this.listItemArray.push(listItem);
    }

    removeListItem(index) {
        this.listItemArray.splice(index, 1);
    }

    getListItems() { return this.listItemArray; }

    getTitle() { return this.title; }
}

export default List;
