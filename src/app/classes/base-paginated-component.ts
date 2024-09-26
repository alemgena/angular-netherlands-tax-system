export abstract class BasePaginatedComponent {
  page: number;
  loading: boolean;

  protected constructor(page: number = 0, loading: boolean = true) {
    this.page = page;
    this.loading = loading;
  }

  abstract fetchCurrentPage(): void;

  protected next(): void {
    this.page++
    this.fetchCurrentPage()
  }

  protected previous(): void {
    this.page--
    this.fetchCurrentPage()
  }
}
