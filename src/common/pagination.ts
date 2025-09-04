import { IMeta } from './response';

export class PaginationHelper {
  private skip: number;
  private page: number;
  private limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
  }

  getSkip() {
    return this.skip;
  }

  generateMeta(total: number) {
    const meta: IMeta = {
      page: this.page,
      limit: this.limit,
      total,
      totalPage: Math.ceil(total / this.limit),
    };

    return meta;
  }
}
