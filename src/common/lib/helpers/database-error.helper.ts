import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { MYSQL_ERRORS } from '../../constants';

export function handleDatabaseError(
  error: unknown,
  entityName: string,
): never | void {
  if (!(error instanceof QueryFailedError)) {
    return;
  }

  const errno = (error.driverError as { errno?: number }).errno;

  switch (errno) {
    case MYSQL_ERRORS.FOREIGN_KEY:
      throw new ConflictException(
        `Cannot delete this ${entityName.toLowerCase()} because it is still referenced by other records.`,
      );

    case MYSQL_ERRORS.REFERENCED_ROW_MISSING:
      throw new ConflictException(
        `One of the referenced records for this ${entityName.toLowerCase()} no longer exists.`,
      );

    case MYSQL_ERRORS.DUPLICATE_ENTRY:
      throw new ConflictException(`${entityName} already exists.`);

    default:
      return;
  }
}
