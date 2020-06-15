
export enum OrderByDirection {
  DESC = 'DESC',
  ASC = 'ASC'
}

export interface OrderProps {
  orderBy: string;
  orderByDirection: OrderByDirection;
}

export class Pagination {
  pageSize: number;
  pageNumber: number;

  constructor(size: number, page: number) {
    this.pageSize = size;
    this.pageNumber = page;
  }

  setPageSize(size: number) { this.pageSize = size; }
  setPageNumber(page: number) { this.pageNumber = page; }

  next() { this.pageNumber++; }
  prev() { this.pageNumber = this.pageNumber > 1 ? this.pageNumber - 1 : 1; }
}
