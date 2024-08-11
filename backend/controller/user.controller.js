import { TryCatch } from "../middleware/asyncErrors.js";
import { DeleteFileCloudinary, UploadFilesCloudinary } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/user.model.js";
import { generateTokenFromid } from "../utils/generateToken.js";


const registerUser = TryCatch(async (req, res, next) => {
       
    const { name, about, email, session, department, password, avatar } = req.body;

    const existedName = await User.findOne({ name });
    if (existedName) return next(new ErrorHandler('Username already exists', 400));

    const result = await UploadFilesCloudinary(avatar, "user");
    if (!result) return next(new ErrorHandler('Image upload failed', 400));

    let userData = { name, about, email, session, department, password , avatar: { public_id: result.public_id, url: result.secure_url } };

    // if (req.body?.socialmedia) {
    //     const socialMedia = JSON.parse(req.body.socialmedia);
    //     userData.socialMedia = socialMedia;
    // }

    // if (req.body?.career) {
    //     const career = JSON.parse(req.body.career);
    //     userData.career = career;
    // }

    // if (req.body?.password) {
    //     userData.password = req.body.password;
    // }

    // if (req?.file) {
    //     const folder = "user";
    //     const result = await UploadFilesCloudinary(req.file, folder);
    //     if (!result) return next(new ErrorHandler('Image upload failed', 400));

    //     userData.img = {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     };
    // }

    const user = await User.create(userData);
    if (!user) {
        if (userData.avatar && userData.avatar.public_id) {
            await DeleteFileCloudinary(userData.avatar.public_id);
        }
        return next(new ErrorHandler('User creation failed', 400));
    }

    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
});

const loginUser = TryCatch(async (req, res, next) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name }).select('+password');
    if (!user) return next(new ErrorHandler('Invalid Username', 401));

    const isPasswordMatched = await user.isPasswordCorrect(password);
    if (!isPasswordMatched) return next(new ErrorHandler('Invalid Password', 401));

    const token = generateTokenFromid(user._id);
    if (!token) return next(new ErrorHandler('Token generation failed', 500));

    const options = {
        secure: true,
        samSite: 'None',
        httpOnly: true
    };
    return res.status(200).cookie('JWT-Token', token, options).json({
        success: true,
        message: 'User logged in successfully',
        data: user
    })
})

const logoutUser = TryCatch(async (req, res, next) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }
    return res.status(200).clearCookie("JWT-Token", options).json
        ({ success: true, message: "Logged Out Successfully" })
});

const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find();
    if (!users) return next(new ErrorHandler('No users found', 404));

    return res.status(200).json({
        success: true,
        message: 'All users fetched successfully',
        data: users
    })
});

const deleteUser = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('No user found', 404));

    if (user._id.toString() === req.user._id.toString()) return next(new ErrorHandler('You cannot delete yourself', 400));

    if (user.avatar) {
        await DeleteFileCloudinary(user.avatar.public_id);
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    })
});

const getUser = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('No user found', 404));

    return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: user
    })
});

const updateUser = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // // Check if socialMedia is provided in the update
    // if (updateData.socialMedia) {
    //     // Case 1: Update specific social media object
    //     if (updateData.socialMedia._id) {
    //         const index = user.socialMedia.findIndex(s => s._id.toString() === updateData.socialMedia._id.toString());
    //         if (index !== -1) {
    //             // Update existing social media object
    //             user.socialMedia[index] = { ...user.socialMedia[index], ...updateData.socialMedia };
    //         } else {
    //             // Add new social media object if platform not found
    //             user.socialMedia.push(updateData.socialMedia);
    //         }
    //     }
    //     // Case 2: Replace entire socialMedia array
    //     else if (Array.isArray(updateData.socialMedia)) {
    //         user.socialMedia = updateData.socialMedia;
    //     }
    //     delete updateData.socialMedia; // Prevent re-updating
    // }

    // // Check if career is provided in the update
    // if (updateData.career) {
    //     // Case 1: Update specific career object by unique identifier (e.g., id)
    //     if (updateData.career._id) {
    //         const index = user.career.findIndex(c => c._id.toString() === updateData.career._id.toString());
    //         if (index !== -1) {
    //             // Update existing career object by id
    //             user.career[index] = { ...user.career[index], ...updateData.career };
    //         } else {
    //             // Optionally handle the case where the id does not exist
    //             user.career.push(updateData.career);
    //         }
    //     }
    //     // Case 2: Replace entire career array
    //     else if (Array.isArray(updateData.career)) {
    //         user.career = updateData.career;
    //     }
    //     delete updateData.career; // Prevent re-updating
    // }

    // Update other fields
    Object.keys(updateData).forEach(key => {
        user[key] = updateData[key];
    });

    await user.save();
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    });
});

const updateUserImage = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('No user found', 404));

    
    const file = req.file;
    const folder = "user";
    const result = await UploadFilesCloudinary(file, folder);
    if (!result) return next(new ErrorHandler('Image upload failed', 400));

    await DeleteFileCloudinary(user.avatar.public_id);

    user.avatar = {
        public_id: result.public_id,
        url: result.secure_url
    };

    await user.save();
    return res.status(200).json({
        success: true,
        message: 'User image updated successfully',
        data: user
    })
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
    updateUserImage
}