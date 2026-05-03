export type MessageRole = "assistant" | "user";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string; // The markdown "Meal"
  snack?: string; // Short scannable context "Snack"
  source?: string; // e.g. "Election Commission of India, accessed May 3, 2026"
  timestamp: Date;
}
