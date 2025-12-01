import * as courseService from '../services/course.service.js';
import catchAsync from '../utils/catchAsync.js';

export const createCourse = catchAsync(async (req, res) => {
    const course = await courseService.createCourse({ ...req.body, instructor: req.user.id });
    res.status(201).json({ status: 'success', data: course });
});

export const getCourses = catchAsync(async (req, res) => {
    const courses = await courseService.getAllCoursesForAdmin();
    res.status(200).json({ status: 'success', results: courses.length, data: courses });
});

export const getCourse = catchAsync(async (req, res) => {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json({ status: 'success', data: course });
});

export const updateCourse = catchAsync(async (req, res) => {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: course });
});

export const deleteCourse = catchAsync(async (req, res) => {
    await courseService.deleteCourse(req.params.id);
    res.status(204).json({ status: 'success', data: null });
});