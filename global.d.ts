type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Movie = {
  id: string;
  poster: string;
  title: string;
  year: number;
  created_at: Date;
  user_id: string;
};
