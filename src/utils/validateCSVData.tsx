import { z } from "zod";
import { ProjectParticipantCollection } from "../types/ParticipantType";
import { ProjectParticipantCollectionSchema } from "../zodSchemas/projectParticipantSchema";

export const validateProjectParticipationCollection = (
  data: unknown
): ProjectParticipantCollection => {
  const parsedResult = ProjectParticipantCollectionSchema.safeParse(data);
  return parsedResult.success ? parsedResult.data : [];
};
