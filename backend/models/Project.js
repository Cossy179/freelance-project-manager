const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  lists: [
    {
      title: { type: String, required: true },
      cards: [
        {
          title: { type: String, required: true },
          description: { type: String },
          dueDate: { type: Date },
          status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
          createdAt: { type: Date, default: Date.now },
        }
      ],
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
