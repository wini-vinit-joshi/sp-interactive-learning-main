import { NextResponse } from "next/server";

const IMAGE_KEYS = [
  "Rot",
  "Wall Covering Damage",
  "Water Damage & Leaks",
  "Surface Water & Grading",
  "Exterior Door Issues",
  "Balcony & Deck Safety",
];

const KEYWORDS: Record<string, string[]> = {
  "Rot":                      ["rot", "wood rot", "decay", "deteriorat", "fungal", "mold"],
  "Wall Covering Damage":     ["wall", "siding", "cladding", "crack", "damage", "peel", "blister"],
  "Water Damage & Leaks":     ["water", "leak", "moisture", "stain", "wet", "seep", "flood"],
  "Surface Water & Grading":  ["grade", "grading", "drainage", "slope", "surface water", "runoff", "foundation"],
  "Exterior Door Issues":     ["door", "frame", "threshold", "seal", "gap", "hinge", "weather"],
  "Balcony & Deck Safety":    ["balcony", "deck", "railing", "guard", "ledger", "joist", "structural"],
};

function evaluateRemark(label: string, remark: string): { accuracy: string; score: number; feedback: string } {
  const lower = remark.toLowerCase();
  const hits = (KEYWORDS[label] ?? []).filter((kw) => lower.includes(kw)).length;
  const total = (KEYWORDS[label] ?? []).length;
  const ratio = hits / total;

  if (ratio >= 0.5) return { accuracy: "correct", score: 90 + Math.round(ratio * 10), feedback: "Great observation — key defects identified." };
  if (ratio >= 0.2) return { accuracy: "partial", score: 55 + Math.round(ratio * 60), feedback: "Partially correct. Some defects were missed." };
  return { accuracy: "wrong", score: 20 + Math.round(ratio * 30), feedback: "Key defects were not identified. Review this image again." };
}

export async function POST(req: Request) {
  try {
    const { userRemarks } = await req.json();

    // userRemarks format: "[Label]: remark\n[Label]: remark\n..."
    const lines: string[] = typeof userRemarks === "string" ? userRemarks.split("\n") : [];

    const perImage = IMAGE_KEYS.map((label) => {
      const line = lines.find((l) => l.startsWith(`[${label}]:`)) ?? "";
      const remark = line.replace(`[${label}]:`, "").trim();
      return { label, remark, ...evaluateRemark(label, remark) };
    });

    const totalScore = Math.round(perImage.reduce((sum, r) => sum + r.score, 0) / perImage.length);
    const correctCount = perImage.filter((r) => r.accuracy === "correct").length;
    const totalAccuracy =
      correctCount === perImage.length ? "correct" :
      correctCount >= perImage.length / 2 ? "partial" : "wrong";

    const overallFeedback =
      totalAccuracy === "correct" ? "Excellent analysis! You identified defects across all images with great accuracy." :
      totalAccuracy === "partial" ? "Good effort! You caught several issues but missed some key defects in a few images." :
      "Needs improvement. Review the images carefully and focus on common defect patterns.";

    const missedIssues = perImage
      .filter((r) => r.accuracy !== "correct")
      .map((r) => `${r.label}: ${r.feedback}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      accuracy: totalAccuracy,
      score: totalScore,
      feedback: overallFeedback,
      missedIssues,
      perImage,
    });
  } catch {
    return NextResponse.json({ error: "Failed to evaluate" }, { status: 500 });
  }
}
