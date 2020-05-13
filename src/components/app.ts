import { LitElement, html } from '@polymer/lit-element'
import './add-item';
import './list-items';
import '../models/ListItem';

class TodoApp extends LitElement {
    todoList: Array<ListItem>;

    static get properties() {
        return {
            todoList: Array
        }
    }

    constructor() {
        super();
        let list = JSON.parse(localStorage.getItem('todo-list')!)
        this.todoList = list === null ? [] : list;
    }

    deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
    }

    _firstRendered() {
        this.addEventListener('addItem', ((e: CustomEvent) => {
            console.log("new-item...")
            console.log(this.todoList);
            this.todoList = e.detail.todoList;
        }) as EventListener);

        this.addEventListener('removeItem', ((e: CustomEvent) => {
            console.log("remove-item...")
            let index = this.todoList.map(function (item) {
                return item.id
            }).indexOf(e.detail.itemId);
            this.todoList.splice(index, 1);
            this.todoList = this.deepClone(this.todoList);
            localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        }) as EventListener);

        this.addEventListener('changeItem', ((e: CustomEvent) => {
            console.log("change-item...")
            let index = this.todoList.map(function (item) {
                return item.id
            }).indexOf(e.detail.itemId);
            this.todoList[index].done = !this.todoList[index].done;
            localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        }) as EventListener);
    }

    _render() {
        return html`
        <add-item></add-item>
        <list-items todoList=${this.todoList}></list-items>
        `;
    }
}

customElements.define('todo-app', TodoApp)