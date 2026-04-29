import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createFineTuneJob(fileId) {
  const job = await openai.fineTuning.jobs.create({
    training_file: fileId,
    model: "gpt-4.1-nano-2025-04-14",
  });

  return job.id;
}

export async function waitForFineTune(jobId) {
  let status = "queued";
  let result;

  while (
    status !== "succeeded" &&
    status !== "failed" &&
    status !== "cancelled"
  ) {
    await new Promise((r) => setTimeout(r, 30000));

    result = await openai.fineTuning.jobs.retrieve(jobId);
    status = result.status;

    console.log("Status:", status);
  }

  if (status === "succeeded") {
    console.log("DONE MODEL:", result.fine_tuned_model);
    return result.fine_tuned_model;
  }

  throw new Error(result.error?.message || "Fine-tuning failed");
}