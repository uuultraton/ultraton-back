const { Schema, model } = require('mongoose');

const User = model(
  'User',
  new Schema(
    {
      email: { type: String, unique: true },
      password: String,

      profile: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        about: { type: String, default: '' },
        avatarBuffer: { data: Buffer, contentType: String },
      },

      skills: {
        learnt: [String],
        plannedToLearn: [String],
      },

      logs: [
        {
          message: { type: String, default: 'User created' },
          time: { type: Date, default: Date.now() },
        },
      ],
    },
    { timestamps: true },
  ),
);

module.exports = User;
