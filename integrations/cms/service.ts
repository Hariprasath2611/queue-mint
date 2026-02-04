import { WixDataItem } from ".";

/**
 * Pagination options for querying collections
 */
export interface PaginationOptions {
  /** Number of items per page (default: 50, max: 1000) */
  limit?: number;
  /** Number of items to skip (for offset-based pagination) */
  skip?: number;
}

/**
 * Metadata for a multi-reference field (available on item._refMeta[fieldName])
 * Only populated by getById, not getAll
 */
export interface RefFieldMeta {
  /** Total count of referenced items */
  totalCount: number;
  /** Number of items returned */
  returnedCount: number;
  /** Whether there are more items beyond what was returned */
  hasMore: boolean;
}

/**
 * Paginated result with metadata for infinite scroll
 */
export interface PaginatedResult<T> {
  /** Array of items for current page */
  items: T[];
  /** Total number of items in the collection */
  totalCount: number;
  /** Whether there are more items after current page */
  hasNext: boolean;
  /** Current page number (0-indexed) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Offset to use for next page */
  nextSkip: number | null;
}

/**
 * Generic CRUD Service class for Wix Data collections
 * Provides type-safe CRUD operations with error handling
 */
export class BaseCrudService {
  /**
   * Creates a new item in the collection
   */
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    multiReferences?: Record<string, any>
  ): Promise<T> {
    console.log(`Mocking create for ${collectionId}`);
    return itemData as T;
  }

  /**
   * Retrieves items from the collection with pagination
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[],
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    return {
      items: [],
      totalCount: 0,
      hasNext: false,
      currentPage: 0,
      pageSize: pagination?.limit ?? 50,
      nextSkip: null,
    };
  }

  /**
   * Retrieves a single item by ID
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[]
  ): Promise<T | null> {
    return null;
  }

  /**
   * Updates an existing item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    return itemData;
  }

  /**
   * Deletes an item by ID
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    return { _id: itemId } as T;
  }

  /**
   * Adds references to a multi-reference field
   */
  static async addReferences(
    collectionId: string,
    itemId: string,
    references: Record<string, string[]>
  ): Promise<void> {
    return;
  }

  /**
   * Removes references from a multi-reference field
   */
  static async removeReferences(
    collectionId: string,
    itemId: string,
    references: Record<string, string[]>
  ): Promise<void> {
    return;
  }
}
