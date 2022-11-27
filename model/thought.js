const { Schema, model } = require('mongoose');

// reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    content: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// thought model
const thoughtSchema = new Schema (
    {
      thought: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      reaction: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)
const Thought = model('Thought', thoughtSchema);

module.exports = reactionSchema;
module.exports = Thought;