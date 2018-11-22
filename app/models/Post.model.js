let Post = new schema({
  user_id: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Post", Post);
