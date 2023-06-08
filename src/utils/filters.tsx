import { ProjectParticipationCollection } from "../types/ProjectTypes";

export const removeProjectsWithLessThanTwoParticipators = (
  projectsData: ProjectParticipationCollection
): ProjectParticipationCollection => {
  return new Map([...projectsData].filter(([k, v]) => v.length > 1));
};
