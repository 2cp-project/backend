const mongoose = require("mongoose");

// Define the common schema for blogs, resources, and courses
const contentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
});

// Create multiple models using the same schema

// Define middleware or methods specific to each model
// For example, let's define a method to get the author's username
contentSchema.methods.getAuthorInfo = async function () {
  try {
    // Populate the user_id field to get user details
    await this.populate("user_id", "name image").execPopulate();
    // Access user details from the populated user_id field
    const { name, image } = this.user_id;
    return { name, image };
  } catch (error) {
    throw new Error("Error getting author info: " + error.message);
  }
};
const Blog = mongoose.model("Blog", contentSchema);
const Resource = mongoose.model("Resource", contentSchema);
const Course = mongoose.model("Course", contentSchema);

// Export the models
module.exports = { Blog, Resource, Course };
