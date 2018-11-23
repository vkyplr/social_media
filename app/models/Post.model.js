let Post = new schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Post", Post);
