import {LitElement, html} from '@polymer/lit-element'
import './add-item';
import './list-items';
import '../models/ListItem';

class TodoApp extends LitElement {
    _todoList: Array<ListItem>;
    
    static get properties() {
        return {
            todoList: Array
        }
    }

    constructor() {
        super();
        let list = JSON.parse(localStorage.getItem('todo-list')!)
        this._todoList = list === null ? [] :  list;
    }

    deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
      }

    _firstRendered(){
        (this as any).addEventListener('addItem', (e: CustomEvent) => {
            this._todoList = e.detail.todoList; 
        })
        (this as any).addEventListener('removeItem', (e: CustomEvent) => {
            let index = this._todoList.map(function(item) 
            {
                return item.id
            }).indexOf(e.detail.itemId); 
            this._todoList.splice(index, 1);
            this._todoList = this.deepClone(this._todoList);
            localStorage.setItem('todo-list', JSON.stringify(this._todoList));
        })
        (this as any).addEventListener('changeItem', (e: CustomEvent) => {
            let index = this._todoList.map(function(item) 
            {
                return item.id
            }).indexOf(e.detail.itemId); 
            this._todoList[index].done = !this._todoList[index].done;
            localStorage.setItem('todo-list', JSON.stringify(this._todoList));
        })
    }

    _render({todoList} : {todoList: Array<ListItem>}) {
        return html`
        <add-item></add-item>
        <list-items todoList=${todoList}></list-items>
        `;
    }
}

customElements.define('todo-app', TodoApp)