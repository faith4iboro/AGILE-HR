import type { ID } from "./common";

export type DocumentCategory = "Policy" | "Contract" | "Certificate" | "Form";

export interface HRDocument {
  id: ID;
  name: string;
  category: DocumentCategory;
  uploadedBy: string;
  uploadedAt: string;
  sizeKb: number;
}
