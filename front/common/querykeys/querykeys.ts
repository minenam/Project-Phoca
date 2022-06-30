export const vocaKeys = {
  getAll: ["getVocaInfo"] as const,
  lists: () => [...vocaKeys.getAll, "list"] as const,
  detail: (id: string) => ["getVocaInfo", id] as const,
};
