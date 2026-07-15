export default class TaskService {
  constructor() {
    this.tasks = [];
    this.taskId = 1;
    this.loadTasks();
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.taskId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map(t => t.id)) + 1
          : 1;
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks() {
    return this.tasks;
  }

  addTask(text) {
    const newTask = {
      id: this.taskId++,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }
}