export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}
export declare function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta;
export declare function getSkipTake(page?: number, limit?: number): {
    skip: number;
    take: number;
    page: number;
    limit: number;
};
