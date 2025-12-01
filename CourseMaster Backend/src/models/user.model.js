import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ["Student", "Admin"], default: "Student" },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Enrollment", // Reference to the Enrollment model for tracking
            },
        ],
    },
    { timestamps: true }
);

// Pre-save hook to hash the password before saving [cite: 21]
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
