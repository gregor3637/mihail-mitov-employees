import { z } from "zod";
import {
  ProjectParticipantCollectionSchema,
  ProjectParticipantSchema,
} from "../zodSchemas/projectParticipantSchema";

export type ProjectParticipant = z.infer<typeof ProjectParticipantSchema>;
export type ProjectParticipantCollection = z.infer<
  typeof ProjectParticipantCollectionSchema
>;
export type ParticipantWorkSpan = Omit<ProjectParticipant, "projectID">;
