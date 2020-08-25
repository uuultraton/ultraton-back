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
      },
    },
    { timestamps: true },
  ),
);

module.exports = User;
