const handleFactory = require("./handleFactory");
const asyncCatcher = require("../utils/asyncCatcher");
const User = require("../models/userModule");
const { Blog } = require("../../userAuth/models/contentModule");
const { Course } = require("../../userAuth/models/contentModule");
const { Resource } = require("../../userAuth/models/contentModule");

exports.getAllUsers = asyncCatcher(async (req, res, next) => {
  const users = await User.find({});
  // Send the users data as a response
  res.status(200).json({
    status: "success",
    dataLength: users.length,
    data: {
      users,
    },
  });
});
exports.getUser = asyncCatcher(async (req, res, next) => {
  // const user = req.user;
  const user= await User.find({_id:req.params.userID}).populate('Experiences')
  console.log(user)
  
  // Send the user's name and photo as a response
  res.status(200).json(user,res.activities);
  console.log("this is the username",user.name);
});
exports.updateuser=asyncCatcher(async (req, res, next) => {
  await User.findOneAndUpdate({_id:req.user._id},req.body)
  res.json({
    seccess:true,
  }) 
})
// exports.deletuser=asyncCatcher(async (req, res, next) => {
//   await User.findOneAndDelete(req.user._id)
//   res.json({
//     seccess:true,
//   })
// })

exports.updateeducation=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$push:{education:req.body.data}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error adding education:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add education ",
    });
  }
})
exports.deleteeducation=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$pull:{education:{$in:[req.body.data]}}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error deleting education:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete education ",
    });
  }
})
exports.updateskills=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$push:{skills:req.body.data}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error adding skill:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add skill ",
    });
  }
})
exports.deleteskills=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$pull:{skills:{$in:[req.body.data]}}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error delete skill:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete skill ",
    });
  }
})



exports.updateslicences=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$push:{licences:req.body.data}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error adding licence:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add licence ",
    });
  }
})
exports.deletelicences=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$pull:{licences:{$in:[req.body.data]}}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error delete licence:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete licence ",
    });
  }
})




exports.updateslanguage=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$push:{language:req.body.data}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error adding language:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add language ",
    });
  }
})
exports.deletelanguage=asyncCatcher(async (req, res, next) => {
  try{
const myuser= await User.findOneAndUpdate({_id:req.user._id},{$pull:{language:{$in:[req.body.data]}}});
res.json({
  seccess:true,
})
}
  catch(error){
    console.error("Error delete language:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete language ",
    });
  }
})



exports.updateSkills = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Extract skills array from request body
    const { skills } = req.body;

    // Update user's skills array
    user.skills = skills;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ status: "success", message: "Skills updated successfully" });
  } catch (error) {
    console.error("Error updating skills:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


exports.getUsersaves = asyncCatcher(async (req, res, next) => {
  // const user = req.user;
  const user= await User.find({_id:req.params.userID})
  const sevess=user.saves
  const  populateduser = await Promise.all(saves.map(async(save) => {
    // Access user details from the populated user_id field
  await  save.id.populate("user_id","name photo");
   return save;
  }));
  console.log(user)
  
  // Send the user's name and photo as a response
  res.status(200).json(populateduser);
  console.log("this is the username",populateduser);
});








exports.getuseractivities=asyncCatcher(async (req, res, next) => {
  try {
      const blogs=await Blog.find({user_id:req.body.user_id}).sort({datePublished:-1});
      const courses=await Course.find({user_id:req.user_id}).sort({datePublished:-1});
      const resourses=await Resource.find({user_id:req.user_id}).sort({datePublished:-1});
      const activities = blogs.concat(courses, resourses);

// Sort the merged array by datePublished (from newest to oldest)
activities.sort((a, b) => b.datePublished - a.datePublished);

// Output the sorted merged array
console.log(activities);
      res.activities({data:activities,blogs:blogs,courses:courses,res:resourses})
      next()
    }
    
  catch(error){
          console.error("Error getting statistics:", error);
          res.status(500).json({
            status: "error",
            message: "Failed to get statistics ",
  
      })

      }});
// exports.getAllUsers=handleFactory.getAll(User)

exports.getUserCv = handleFactory.getOne(User);
exports.updateUserInfo=handleFactory.updateOne(User);