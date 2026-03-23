const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { context, message } = req.body;

    let responseText =
      "That's an interesting question. In home inspection, we typically look at these elements during the " +
      context +
      " phase. Would you like to try a practice exercise on this topic?";

    const msgLower = message.toLowerCase();

    if (msgLower.includes("siding") || msgLower.includes("rot") || msgLower.includes("wood")) {
      responseText =
        "Siding issues, especially wood rot, are very common. Always check for proper clearance (usually 6-8 inches) between the siding and the soil or mulch.";
    } else if (
      msgLower.includes("franchise") ||
      msgLower.includes("business") ||
      msgLower.includes("cost") ||
      msgLower.includes("money")
    ) {
      responseText =
        "Starting a WIN Home Inspection franchise is a low-overhead opportunity. You don't need inventory or a retail storefront. Let me know if you want to book a call with our franchise development team!";
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    res.json({ reply: responseText });
  } catch {
    res.status(500).json({ error: "Failed to process chat" });
  }
});

app.post("/api/evaluate", async (req, res) => {
  try {
    const { userRemarks } = req.body;

    let accuracy = "wrong";
    let score = 30;
    let feedback =
      "Your remarks did not cover the primary issues in the images. Remember to look closely at structural integrity.";
    let missedIssues = [
      "Window seal failure on image 2",
      "Rotting wood near the foundation",
      "Improper grading leading water towards the house",
    ];

    const remarksLower = userRemarks.toLowerCase();

    if (
      remarksLower.includes("moisture") ||
      remarksLower.includes("rot") ||
      remarksLower.includes("siding")
    ) {
      accuracy = "partial";
      score = 65;
      feedback =
        "Good eye spotting the siding issues! You correctly identified moisture damage. However, you missed a few related problems.";
      missedIssues = ["Improper flashing around the windows", "Grading issues at the foundation line"];
    }

    if (
      (remarksLower.includes("rot") || remarksLower.includes("siding")) &&
      (remarksLower.includes("grade") ||
        remarksLower.includes("grading") ||
        remarksLower.includes("foundation")) &&
      (remarksLower.includes("window") ||
        remarksLower.includes("flashing") ||
        remarksLower.includes("seal"))
    ) {
      accuracy = "correct";
      score = 95;
      feedback =
        "Excellent analysis! You accurately identified the wood rot, the poor grading, and the window seal failures. This level of detail is exactly what makes a great home inspector.";
      missedIssues = [];
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    res.json({ accuracy, score, feedback, missedIssues });
  } catch {
    res.status(500).json({ error: "Failed to evaluate" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
