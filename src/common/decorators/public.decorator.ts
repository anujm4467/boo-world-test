import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Constant representing the metadata key for skipping an interceptor.
 * Use this key to mark a controller or method to skip the specified interceptor.
 * @constant
 */
export const SKIP_INTERCEPTOR = 'skipInterceptor';

/**
 * Decorator function for skipping an interceptor.
 * Apply this decorator to a controller or method to indicate that the specified interceptor should be skipped.
 * @returns  The SetMetadata decorator with the SKIP_INTERCEPTOR key and value true.
 */
export const SkipInterceptor = (): CustomDecorator<string> =>
  SetMetadata(SKIP_INTERCEPTOR, true);
