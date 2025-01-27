type PaginationLink = {
  label: string;
  url: string;
};

type PaginationMeta = {
  pages: number;
  links: PaginationLink[];
  nextPage: PaginationLink | null;
  prevPage: PaginationLink | null;
};
