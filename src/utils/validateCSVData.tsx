import { z } from "zod";
import { ProjectParticipantCollection } from "../types/ParticipantType";
import { ProjectParticipantCollectionSchema } from "../zodSchemas/projectParticipantSchema";

export const validateProjectParticipationCollection = (
  data: unknown
): ProjectParticipantCollection | null => {
  const parsedResult = ProjectParticipantCollectionSchema.safeParse(data);

  if (parsedResult.success) {
    return parsedResult.data;
  } else {
    return null;
  }
};
