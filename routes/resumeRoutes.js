import express from "express";
import Resume from "../models/ResumeModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE a new resume
router.post("/", protect, async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, user: req.user.id });
    const created = await resume.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Failed to create resume" });
  }
});

// GET all resumes for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

// UPDATE a resume
router.put("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE a resume
router.delete("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await resume.deleteOne();
    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
