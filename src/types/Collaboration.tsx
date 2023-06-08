export type CollaboratorsPairData = {
  id: string;
  firstCollaboratorID: number;
  secondCollaboratorID: number;
  totalCollaborationDays: number;
  projects: [{ id: number; collaborationDays: number }];
};

export type CollaborationData = {
  collaborationId: string;
  firstCollaboratorID: number;
  secondCollaboratorID: number;
  days: number;
};

// export type CollaboratorsPairDataCollection = Array<CollaboratorsPairData>;
