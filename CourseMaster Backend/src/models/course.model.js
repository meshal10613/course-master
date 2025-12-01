import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
}); // Define batches for courses [cite: 45]

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, index: true }, // Index for searching [cite: 54]
        description: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: { type: String, index: true }, // Index for filtering
        tags: [{ type: String, index: true }], // Index for filtering
        syllabus: [
            {
                // One-to-Many with lessons
                title: String,
                videoUrl: String, // Can use embedded YouTube/Vimeo links [cite: 37]
                duration: Number,
            },
        ],
        batches: [batchSchema],
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
