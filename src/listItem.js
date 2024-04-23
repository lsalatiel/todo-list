class ListItem {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    getTitle() { return this.title; }
    getDescription() { return this.description; }
    getDueDate() { return this.dueDate; }
    getPriority() { return this.priority; }
    getStatus() { return this.status; }

    setTitle(title) { this.title = title; }
    setDescription(description) { this.description = description; }
    setDueDate(dueDate) { this.dueDate = dueDate; }
    setPriority(priority) { this.priority = priority; }
    setStatus(status) { this.status = status; }
}

export default ListItem;
