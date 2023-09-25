const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    //get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({
                thought,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    //delete a thought and remove it from a user
    async deleteThought(req, res) {
        try {

            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'no thought with that id found' });
            }

            const user = await User.findOneAndRemove(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'thought deleted but no user found' });
            }

            res.json({ message: 'thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //get all thoughts posted by a user
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({ userId: req.params.userId }).select('-__v');

            const thoughtObj = {
                thoughts,
            };

            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');

            const thoughtObj = {
                thoughts,
            };

            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};