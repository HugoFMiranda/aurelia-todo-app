import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class InputModal {
  @bindable addTodo = () => {
  };

  @bindable closeModal = () => {
  };

  @bindable newTodo = '';

  constructor(element) {
    this.element = element;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  attached() {
    document.addEventListener('click', this.handleClickOutside);
  }

  detached() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const modalPanel = this.element.querySelector('.modal-panel');
    if (modalPanel && !modalPanel.contains(event.target)) {
      this.closeModal();
    }
  }

}
