export type ResponseData<T> = { data: T };

export type Paging = {
  total: number;
  page: number;
  limit: number;
};

export type PagedResponseData<T> = { data: T[]; meta: Paging };

export type DateString =
  `${number}-${number}-${number}T${number}:${number}:${number}Z`;
