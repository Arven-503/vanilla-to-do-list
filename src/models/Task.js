export default class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}