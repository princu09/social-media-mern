const Post = require("../models/post");

const { validationResult } = require("express-validator");

exports.uploadPost = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const post = new Post(req.body);
  post.save((err, Newpost) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to add post",
      });
    }
    res.json({
      message: "Success",
      post,
    });
  });
};

exports.allPost = async (req, res) => {
  const post = await Post.find();
  res.json(post);
};
