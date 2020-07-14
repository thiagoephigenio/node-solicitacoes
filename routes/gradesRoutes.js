module.exports = (app) => {
  const controller = require("../controllers/controllerGrade");
  // 
  app.get("/grades", controller.getAll);

  app.post("/grade/register", controller.register);
  app.post("/grade/update", controller.update);
  app.post("/grade/delete", controller.delete);
  app.post("/grade/find", controller.findById);
  app.post("/grade/soma", controller.somaNotas);
  app.post("/grade/media", controller.calcMediaSubjects);
  app.post("/grade/top3", controller.getTopNotas);

  // app.get("/views", controller.principal);

  // app.get("/send", controller.sendSmgets);



  // app.put("/client/update", controller.update);

  // app.delete("/client/delete", controller.delete);
};
