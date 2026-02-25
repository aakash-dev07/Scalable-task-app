import mongoose, { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = models.Task || model("Task", TaskSchema);
export default Task;