//EXECUTE ALL ROUTES FUNCTIONS FROM POSTS IN ROUTES IN HERE

import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try{
       const postMessages = await postMessage.find();

       res.status(200).json(postMessages);
    }
    catch(error){
      res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
  const post = req.body;

  const newPost = new postMessage(post);

  try{
   await newPost.save();

   res.status(201).json(newPost);
  }

  catch(error){
   res.status(409).json({message: error.message });
  }
}

export const updatePost = async (req,res) => {
  const { id: _id } = req.params;

  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  
  const updatedPost = await postMessage.findByIdAndUpdate(_id,post, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req,res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await postMessage.findByIdAndRemove(id);
  

  res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const post = await postMessage.findById(id);
  const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, {new : true});

  res.json(updatedPost);
}