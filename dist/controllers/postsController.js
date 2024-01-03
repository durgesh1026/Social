"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalysis = exports.createPost = void 0;
const posts = [];
const createPost = (req, res) => {
    const { id, content } = req.body;
    const newPost = { id, content };
    posts.push(newPost);
    res.status(201).json({ message: 'Post created successfully', post: newPost });
};
exports.createPost = createPost;
const getAnalysis = (req, res) => {
    const postId = req.params.id;
    const post = posts.find((p) => p.id === postId);
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
    }
    else {
        const words = post.content.split(/\s+/);
        const wordCount = words.length;
        const totalCharacters = words.join('').length;
        const averageWordLength = totalCharacters / wordCount || 0;
        res.status(200).json({
            wordCount,
            averageWordLength,
        });
    }
};
exports.getAnalysis = getAnalysis;
