export class TodoItem {

  states = ["todo", "doing", "done"];

  constructor(text) {
    this.text = text;
    this.state = this.states[0];
  }

  getDone() {
    return this.done;
  }

  setDone(done) {
    this.done = done;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

}
