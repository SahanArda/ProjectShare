import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.userPicturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); // saves post into the database

    const post = await Post.find(); // finds all the posts to display it to the users feed page

    res.status(201).json(post); // created something eg post = 201
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); // finds all the posts to display it to the users feed page
    res.status(200).json(post); // successful request = 200
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); // finds the users posts to display it
    res.status(200).json(post); // successful request = 200
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id); // retrieves post information
    const isLiked = post.likes.get(userId); // retrieves all the users that liked the post with userId

    if (isLiked) {
      post.likes.delete(userId); // checks if the userId exists in isLiked and if it does then it deletes it (unlike the post)
    } else {
      post.likes.set(userId, true); // if userId is not in isLiked then it adds it (likes the post)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      // then update the post with the new modified likes
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // successful request = 200
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
