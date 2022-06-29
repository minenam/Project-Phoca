export const vocaKeys = {
  getAll: ["wordbookList"] as const,
  lists: () => [...vocaKeys.getAll, "list"] as const,
  detail: (id: string) => ["getVocaInfo", id] as const,
};
