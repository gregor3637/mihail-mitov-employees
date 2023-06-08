import { ParticipantWorkSpan } from "./ParticipantType";

export type Project = {
  id: number;
  participants: Array<ParticipantWorkSpan>;
};

export type ProjectParticipants = Array<ParticipantWorkSpan>;

export type ProjectParticipationCollection = Map<number, ProjectParticipants>;
