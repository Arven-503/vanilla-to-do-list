export default class UI {
  static renderTasks(tasks, currentFilter, onToggle, onDelete) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let filteredTasks = tasks;

    if (currentFilter === 'active') {
      filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

      taskDiv.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button class="complete-btn" data-id="${task.id}">
            ${task.completed ? "Reactivar" : "Completar"}
          </button>
          <button class="delete-btn" data-id="${task.id}">Eliminar</button>
        </div>
      `;

      taskDiv.querySelector('.complete-btn').onclick = () =>
        onToggle(task.id);

      taskDiv.querySelector('.delete-btn').onclick = () =>
        onDelete(task.id);

      taskList.appendChild(taskDiv);
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML =
        '<p style="text-align:center;color:#999;padding:20px;">No hay tareas para mostrar</p>';
    }
  }

  static updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }
}