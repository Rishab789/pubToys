const Post = require("../model/postToys");

exports.postFile = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const post = new Post({
      title,
      imageUrl,
    });

    const savedPost = await post.save();
    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      posts,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while getting post",
    });
  }
};
