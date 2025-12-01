import Course from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createCourse = async (courseData) => {
    const course = await Course.create(courseData);
    return course;
};

export const getCourseById = async (courseId) => {
    // Populate instructor to prevent N+1 problem on individual fetch [cite: 56]
    const course = await Course.findById(courseId).populate(
        "instructor",
        "name email"
    );
    if (!course) {
        throw new ApiError(404, "Course not found.");
    }
    return course;
};

export const updateCourse = async (courseId, updateData) => {
    const course = await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!course) {
        throw new ApiError(404, "Course not found.");
    }
    return course;
};

export const deleteCourse = async (courseId) => {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found.");
    }
    return { message: "Course successfully deleted." };
};

// Admin will use this for a simple list, public will use a more complex one (Day 2)
export const getAllCoursesForAdmin = async () => {
    const courses = await Course.find().populate("instructor", "name");
    return courses;
};
