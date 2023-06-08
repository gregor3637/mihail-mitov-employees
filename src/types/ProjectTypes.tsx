import { ParticipantWorkSpan } from "./ParticipantType";

export type Project = {
  id: number;
  participants: Array<ParticipantWorkSpan>;
};

export type ProjectCollection = Map<number, Project>;
