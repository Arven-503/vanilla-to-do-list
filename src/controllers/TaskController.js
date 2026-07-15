import TaskService from "../services/TaskService";
import UI from "../ui/UI";

export default class TaskController {

  constructor() {
    this.service = new TaskService();
    this.currentFilter = "all";
  }


  init() {

    document.getElementById("addBtn").onclick = () => {
      this.addTask();
    };


    document.getElementById("taskInput").onkeypress = (e) => {
      if (e.key === "Enter") {
        this.addTask();
      }
    };


    document.querySelectorAll(".filter-btn")
      .forEach(button => {

        button.onclick = () => {
          this.currentFilter = button.dataset.filter;
          this.render();
        };

      });


    this.render();
  }


  addTask() {

    const input = document.getElementById("taskInput");

    if (!input.value.trim()) {
      alert("Por favor escribe una tarea");
      return;
    }


    this.service.addTask(input.value);

    input.value = "";

    this.render();
  }


  toggleTask(id) {

    this.service.toggleTask(id);

    this.render();

  }


  deleteTask(id) {

    this.service.deleteTask(id);

    this.render();

  }


  render() {

    UI.renderTasks(
      this.service.getTasks(),
      this.currentFilter,
      id => this.toggleTask(id),
      id => this.deleteTask(id)
    );


    UI.updateStats(
      this.service.getTasks()
    );

  }

}