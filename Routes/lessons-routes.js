const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

// === THESE ALREADY HAVE /api/lessons from in the server.js file
router.post("/", (req, res) => {
  Lessons.add(req.body)
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot do the thing" });
    });
});

router.get("/", (req, res) => {
  Lessons.find()
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "can't do it" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.findById(id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "nope, not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "can't do it" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Lessons.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "boom deleted" });
      } else {
        res.status(404).json({ message: "cannot find it" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot delete" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Lessons.update(id, changes)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: " error updating" });
    });
});

router.post("/:id/messages", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }

  Lessons.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: "Invalid Id" });
      }
      if (!msg.sender || !msg.text) {
        res.status(400).json({ message: "Enter sender and text fields" });
      }

      Lessons.addMessage(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Error finding Lesson" });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: " Error finding Lesson " });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;

  Lessons.findLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving messages" });
    });
});

module.exports = router;
