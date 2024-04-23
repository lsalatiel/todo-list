import ListContainer from './listContainer.js';
import View from './view.js';

let listContainer = new ListContainer();

let view = new View();
view.render(listContainer, null);

console.log("Hello World!");
