export const usePagination = <T>(items: T[], pageSize: number, currentPage: number): T[] => {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
