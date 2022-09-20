const { fetchSkillLevelTasks } = require("../models/tasks");
const db = require("../utils/firestore");

const assignTask = async function (req, res) {
  if (req.body.percentCompleted === 100) {
    try {
      const { task } = await fetchSkillLevelTasks("frontend", 1);
      if (task) {
        const docId = task.id;
        const userId = req.userData.id;
        db.collection("tasks").doc(docId).set({ assignee: userId, status: "ASSIGNED" }, { merge: true });
        return res.json({ message: "task updated and another task got assigned" });
      } else {
        return res.json({ message: "Task updated but another task not found" });
      }
    } catch {
      return res.boom.badImplementation("Something went wrong!");
    }
  } else {
    return res.json({ message: "Task updated successfully!" });
  }
};

module.exports = assignTask;
