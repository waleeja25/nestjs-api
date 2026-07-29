export const MYSQL_ERRORS = {
  FOREIGN_KEY: 1451,
  DUPLICATE_ENTRY: 1062,
  REFERENCED_ROW_MISSING: 1452,
} as const;

export const DEFAULT_MESSAGES: Record<string, string> = {
  GET: 'fetched successfully',
  POST: 'created successfully',
  PUT: 'updated successfully',
  PATCH: 'updated successfully',
  DELETE: 'deleted successfully',
};
