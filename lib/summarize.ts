export interface AISummary {
  plainSummary: string;
  qualify: string[];
  notQualify: string[];
  involved: string;
}

export async function summarizeTrial(params: {
  title: string;
  briefSummary?: string;
  eligibilityCriteria?: string;
  studyType?: string;
  enrollment?: number;
  phases?: string[];
  interventions?: string[];
}): Promise<AISummary> {
  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Failed to generate summary");
  }

  return res.json();
}
