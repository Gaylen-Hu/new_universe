// src/common/pagination.service.ts
import { Injectable } from '@nestjs/common';


/**
  * 分页服务，用于对数组进行分页处理。
  * @param items - 要分页的数组。
  * @param page - 当前页码，默认为1。
  * @param limit - 每页显示的数量，默认为10。
  * @returns 分页结果，包含分页后的数组和总数。
  */
@Injectable()
export class PaginationService {
  paginate(items: any[], page: number = 1, limit: number = 10): { items: any[], total: number } {
    const total = items.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedItems = items.slice(startIndex, endIndex);

    return { items: paginatedItems, total };
  }
}
