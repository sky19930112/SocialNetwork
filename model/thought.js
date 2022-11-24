const { Schema, model, Types } = require('mongoose');
// import moment module to format the timestamp 


// thought schema
const thoughtSchema = new Schema (
    {
      thought: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
      },
      username: {
        type: String,
        required: true,
      }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// create the User model using the UserSchema
const Thought = model('thought', thoughtSchema);
// export the Thought model
module.exports = Thought;