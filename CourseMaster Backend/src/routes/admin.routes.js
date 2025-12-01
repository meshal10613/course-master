import express from 'express';
import * as courseController from '../controllers/admin.course.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js'; // Auth middleware (not shown)

const router = express.Router();

router.use(protect, restrictTo('Admin')); 

router.route('/courses')
    .post(courseController.createCourse)
    .get(courseController.getCourses);

router.route('/courses/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

export default router;