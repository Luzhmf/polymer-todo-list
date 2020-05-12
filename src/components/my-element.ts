/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, customElement, property, css } from 'lit-element';
import './my-element2';
import './add-item';
import './list-items';
import '../models/ListItem';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

    _todoList: Array<ListItem>;

    @property({ type: Array })
    todoList = [];

    constructor() {
        super();
        let list = JSON.parse(localStorage.getItem('todo-list')!)
        this._todoList = list === null ? [] : list;
    }

    /**
     * The name to say "Hello" to.
     */
    @property()
    name = 'World';

    /**
     * The number of times the button has been clicked.
     */
    @property({ type: Array })
    count = 0;

    render() {
        return html`
      <h1>Hello, ${this.name}!</h1>
      <my-element2></my-element2>
    `;
    }

    deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
      }

    firstUpdated(){
        console.log('rendered');
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

    foo(): string {
        return 'foo';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
