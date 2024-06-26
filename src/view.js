const App = {
    body: document.querySelector('body'),
    sidebar: document.querySelector('.sidebar'),
    content: document.querySelector('.content')
}

function createButton(buttonText, buttonClass, buttonFunction) {
    let button = document.createElement('button');
    button.textContent = buttonText;
    button.classList.add(buttonClass);
    button.addEventListener('click', buttonFunction);
    return button;
}

function createInput(inputType, placeHolder, inputClass) {
    let input = document.createElement('input');
    input.type = inputType;
    input.placeholder = placeHolder;
    input.classList.add(inputClass);
    return input;
}

function styleSideBar() {
    App.sidebar.style.margin = '0';
    App.sidebar.style.padding = '0';
    App.sidebar.style.width = '400px';
    App.sidebar.style.backgroundColor = '#2C2C2C';
    App.sidebar.style.position = 'fixed';
    App.sidebar.style.height = '100%';
    App.sidebar.style.overflow = 'auto';
}

function styleContent() {
    App.content.style.marginLeft = '400px';
    App.content.style.padding = '1px 16px';
    App.content.style.height = '1000px';
    App.content.style.display = 'flex';
    App.content.style.flexDirection = 'column';
    App.content.style.alignItems = 'center';
}

function styleListButton(listButton) {
    listButton.style.backgroundColor = '#2C2C2C';
    listButton.style.color = 'white';
    listButton.style.border = 'none';
    listButton.style.cursor = 'pointer';
    listButton.style.fontSize = '22px';
    listButton.style.textAlign = 'left';
    listButton.style.padding = '15px';
}

function styleText(text, content, color, fontSize, textAlign) {
    text.textContent = content;
    text.style.color = color;
    text.style.fontSize = fontSize;
    text.style.textAlign = textAlign;
}

function styleInput(input) {
    input.style.flex = '1';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.background = 'transparent';
    input.style.padding = '10px';
    input.style.color = 'white';
    input.style.fontSize = '16px';
}

function styleButton(button) {
    button.style.backgroundColor = '#de6449';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.padding = '15px';
    button.style.fontSize = '24px';
}

function createGenericContentText() {
    const genericTitle = document.createElement('h1');
    styleText(genericTitle, 'Welcome to your To-Do List!', 'white', '45px', 'center');

    const genericSubtitle = document.createElement('h2');
    styleText(genericSubtitle, 'Add a project to get started!', 'white', '30px', 'center');

    App.content.appendChild(genericTitle);
    App.content.appendChild(genericSubtitle);
}

export default class View {
    render(listContainer, currentList) {
        App.body.style.backgroundColor = '#1C1C1C';
        App.sidebar.innerHTML = '';
        App.content.innerHTML = '';

        styleSideBar();
        styleContent();

        this.renderSidebar(listContainer, currentList);
        this.renderContent(listContainer, currentList, 'all');
    }

    renderContent(listContainer, currentList, tasksToShow) {
        App.content.innerHTML = '';

        if(currentList === undefined || currentList === null) {
            createGenericContentText();
            return;
        }
        
        const listTitle = document.createElement('h1');
        styleText(listTitle, currentList.getTitle(), 'white', '55px', 'center');

        const addTaskContainer = document.createElement('div');
        addTaskContainer.style.display = 'flex';
        addTaskContainer.style.justifyContent = 'center';
        addTaskContainer.style.alignItems = 'center';
        addTaskContainer.style.backgroundColor = '#5a5a5a';
        addTaskContainer.style.borderRadius = '15px';
        addTaskContainer.style.width = '25%';

        let taskInput = createInput('text', 'Add your task', 'task-input');
        styleInput(taskInput);
        taskInput.style.fontSize = '24px';
        taskInput.style.textAlign = 'center';
        addTaskContainer.appendChild(taskInput);

        taskInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                if(taskInput.value === '') { console.log("Input Invalid"); return; }
                let taskTitle = taskInput.value;
                taskInput.value = '';
                currentList.addListItem(taskTitle, '', '', 0, 0);
                this.renderContent(listContainer, currentList, 'all');
            }
        });

        let addTaskButton = createButton('+', 'add-task-button', () => {
            if(taskInput.value === '') { console.log("Input Invalid"); return; }
            let taskTitle = taskInput.value;
            taskInput.value = '';
            currentList.addListItem(taskTitle, '', '', 0, 0);
            this.renderContent(listContainer, currentList, 'all');
        });
        styleButton(addTaskButton);
        addTaskButton.style.borderRadius = '15px';
        addTaskContainer.appendChild(addTaskButton);

        let clearTasksButton = createButton('Clear Tasks', 'clear-tasks-button', () => {
            currentList.clearList();
            this.renderContent(listContainer, currentList, 'all');
        });
        styleButton(clearTasksButton);
        clearTasksButton.style.backgroundColor = 'transparent';
        clearTasksButton.style.paddingLeft = '20px';

        const taskContainer = document.createElement('div');
        taskContainer.style.marginTop = '30px';

        const tasks = currentList.getListItems();

        for(let i = 0; i < tasks.length; i++) {
            if(tasksToShow === 'completed' && tasks[i].getStatus() === 0) { continue; }
            if(tasksToShow === 'todo' && tasks[i].getStatus() === 1) { continue; }

            const task = tasks[i];
            const taskDiv = document.createElement('div');
            taskDiv.style.background = 'transparent';
            taskDiv.style.display = 'flex';
            taskDiv.style.marginBottom = '10px';

            const taskTitleDiv = document.createElement('div');
            taskTitleDiv.style.color = 'white';
            taskTitleDiv.style.background = 'transparent';
            taskTitleDiv.style.maxWidth = '500px';
            taskTitleDiv.style.overflow = 'hidden';
            taskTitleDiv.style.textOverflow = 'ellipsis';
            
            const statusButtonDiv = document.createElement('div');
            statusButtonDiv.style.display = 'inline-block';
            statusButtonDiv.style.alignContent = 'center';
            statusButtonDiv.style.height = '80px';
            statusButtonDiv.style.width = '80px';
            statusButtonDiv.style.textAlign = 'center';

            const deleteButtonDiv = document.createElement('div');
            statusButtonDiv.style.display = 'inline-block';
            statusButtonDiv.style.alignContent = 'center';
            statusButtonDiv.style.height = '80px';
            statusButtonDiv.style.width = '80px';
            statusButtonDiv.style.textAlign = 'center';

            const taskTitle = document.createElement('button');
            taskTitle.textContent = task.getTitle();
            styleButton(taskTitle);
            taskTitle.style.fontSize = '28px';
            taskTitle.style.backgroundColor = 'transparent';
            taskTitle.style.textDecoration = task.getStatus() === 0 ? 'none' : 'line-through';
            taskTitle.style.color = task.getStatus() === 0 ? 'white' : '#555';

            taskTitle.addEventListener('click', () => {
                const input = createInput('text', task.getTitle(), 'edit-task-input');
                styleInput(input);
                input.style.padding = '0px';
                input.style.fontSize = '24px';

                taskTitle.textContent = '';
                taskTitle.appendChild(input);

                input.focus();

                input.addEventListener('blur', () => {
                    if(input.value !== '')
                        task.setTitle(input.value);
                    this.renderContent(listContainer, currentList, tasksToShow);
                });

                input.addEventListener('keypress', (e) => {
                    if(e.key === 'Enter') {
                        if(input.value !== '')
                            task.setTitle(input.value);
                        this.renderContent(listContainer, currentList, tasksToShow);
                    }
                });
            });

            let status = task.getStatus() === 0 ? 'U' : 'D';
            let statusColor = task.getStatus() === 0 ? '#de6449' : '#55b761';
            let statusButton = createButton(status, 'status-button', () => {
                task.getStatus() === 0 ? task.setStatus(1) : task.setStatus(0);
                this.renderContent(listContainer, currentList, tasksToShow);
            });
            styleButton(statusButton);
            statusButton.style.backgroundColor = statusColor;
            statusButton.style.fontSize = '22px';
            statusButton.style.borderRadius = '50%';
            statusButton.style.height = '60px';
            statusButton.style.width = '60px';

            let deleteTaskButton = createButton('-', 'delete-button', () => {
                currentList.removeListItem(task);
                this.renderContent(listContainer, currentList, tasksToShow);
            });
            styleButton(deleteTaskButton);
            deleteTaskButton.style.backgroundColor = 'transparent';
            deleteTaskButton.style.fontSize = '32px';
            deleteTaskButton.style.color = '#dc0202';
            deleteTaskButton.style.height = '60px';
            deleteTaskButton.style.width = '60px';
            deleteTaskButton.style.marginLeft = '10px';

            statusButtonDiv.appendChild(statusButton);
            taskTitleDiv.appendChild(taskTitle);
            deleteButtonDiv.appendChild(deleteTaskButton);

            taskDiv.appendChild(statusButtonDiv);
            taskDiv.appendChild(taskTitleDiv);
            taskDiv.appendChild(deleteButtonDiv);
            taskContainer.appendChild(taskDiv);
        }

        const visibleTasksButtonDiv = document.createElement('div');
        visibleTasksButtonDiv.style.flexDirection = 'row';
        visibleTasksButtonDiv.style.marginTop = '15px';

        let showCompletedButton = createButton('Show Completed', 'show-completed-button', null);
        styleButton(showCompletedButton);
        showCompletedButton.style.marginRight = '10px';
        
        let hideCompletedButton = createButton('Hide Completed', 'hide-completed-button', null);
        styleButton(hideCompletedButton);
        hideCompletedButton.style.marginRight = '10px';

        let taskType = tasksToShow;

        showCompletedButton.addEventListener('click', () => {
            if(tasksToShow === 'all' || tasksToShow === 'todo')
                taskType = 'completed';
            else
                taskType = 'all';

            this.renderContent(listContainer, currentList, taskType);
        });

        hideCompletedButton.addEventListener('click', () => {
            if(tasksToShow === 'all' || tasksToShow === 'completed')
                taskType = 'todo';
            else
                taskType = 'all';

            this.renderContent(listContainer, currentList, taskType);
        });

        if(taskType === 'completed') {
            showCompletedButton.style.backgroundColor = '#de6449';
            hideCompletedButton.style.backgroundColor = '#5a5a5a';
        }
        else if (taskType === 'all') {
            showCompletedButton.style.backgroundColor = '#5a5a5a';
            hideCompletedButton.style.backgroundColor = '#5a5a5a';
        }
        else {
            showCompletedButton.style.backgroundColor = '#5a5a5a';
            hideCompletedButton.style.backgroundColor = '#de6449';
        }

        visibleTasksButtonDiv.appendChild(showCompletedButton);
        visibleTasksButtonDiv.appendChild(hideCompletedButton);

        App.content.appendChild(listTitle);
        App.content.appendChild(addTaskContainer);
        App.content.appendChild(clearTasksButton);
        App.content.appendChild(taskContainer);
        App.content.appendChild(visibleTasksButtonDiv);
    }

    renderSidebar(listContainer, currentList) {
        const addListContainer = document.createElement('div');
        addListContainer.style.display = 'flex';
        addListContainer.style.alignItems = 'center';
        addListContainer.style.justifyContent = 'space-between';
        addListContainer.style.background = '#5a5a5a';
        addListContainer.style.paddingLeft = '20px';

        let listInput = createInput('text', 'Add your project', 'list-input');
        styleInput(listInput);
        listInput.style.fontSize = '20px';

        listInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                if(listInput.value === '') { console.log("Input Invalid"); return; }
                let listTitle = listInput.value;
                listInput.value = '';
                let list = listContainer.addList(listTitle);
                if(list === 0) { console.log("List already exists"); return; }
                this.render(listContainer, list);
            }
        });

        addListContainer.appendChild(listInput);

        let addListButton = createButton('+', 'add-list-button', () => {
            if(listInput.value === '') { console.log("Input Invalid"); return; }
            let listTitle = listInput.value;
            listInput.value = '';
            let list = listContainer.addList(listTitle);
            if(list === 0) { console.log("List already exists"); return; }
            this.render(listContainer, list);   
        });
        styleButton(addListButton);
        addListContainer.appendChild(addListButton);

        const listsDiv = document.createElement('div');
        listsDiv.classList.add('lists-div');
        listsDiv.style.display = 'flex';
        listsDiv.style.flexDirection = 'column';

        const lists = listContainer.getLists();

        for(let i = 0; i < lists.length; i++) {
            const listDiv = document.createElement('div');
            listDiv.classList.add('list-div');
            listDiv.style.display = 'flex';
            listDiv.style.flexDirection = 'row';

            const list = lists[i];
            let listButton = createButton(list.title, 'list-button', () => {
                this.render(listContainer, list);
            });
            styleListButton(listButton);
            listButton.style.width = '100%';
            listButton.style.borderTop = '1px solid black';
            listDiv.appendChild(listButton);

            if(currentList !== null && currentList !== undefined && list.getTitle() === currentList.getTitle()) {
                listButton.style.backgroundColor = '#5a5a5a';
            }

            let editListButton = createButton('E', 'edit-button', () => {
                const input = createInput('text', list.getTitle(), 'edit-list-input');
                styleInput(input);
                input.style.padding = '0px';
                input.style.fontSize = '20px';

                listButton.textContent = '';
                listButton.appendChild(input);

                input.focus();

                input.addEventListener('blur', () => {
                    if(input.value !== '')
                        list.setTitle(input.value);
                    this.render(listContainer, list);
                });

                input.addEventListener('keypress', (e) => {
                    if(e.key === 'Enter') {
                        if(input.value !== '')
                            list.setTitle(input.value);
                        this.render(listContainer, list);
                    }
                });
            });
            styleButton(editListButton);
            editListButton.style.borderTop = '1px solid black';
            editListButton.style.backgroundColor = '#5d61b6';
            listDiv.appendChild(editListButton);

            let deleteListButton = createButton('X', 'delete-button', () => {
                listContainer.removeList(list);
                this.render(listContainer, listContainer.getLists()[0]);
            });
            styleButton(deleteListButton);
            deleteListButton.style.borderTop = '1px solid black';
            deleteListButton.style.backgroundColor = '#141414';
            listDiv.appendChild(deleteListButton);

            listsDiv.appendChild(listDiv);
        }

        App.sidebar.appendChild(addListContainer);
        App.sidebar.appendChild(listsDiv);
    }
};

