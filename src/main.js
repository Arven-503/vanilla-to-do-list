import "./style.css";

import TaskController from "./controllers/TaskController";


window.onload = () => {

  const app = new TaskController();

  app.init();

};