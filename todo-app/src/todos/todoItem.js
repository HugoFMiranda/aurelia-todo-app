export class TodoItem {

  status = ["Todo", "Doing", "Done"];

  constructor(text) {
    this.text = text;
    this.state = this.status[0];
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
