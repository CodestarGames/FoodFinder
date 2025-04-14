import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api'
import QuickLRU from 'quick-lru';

export const lruCache = new QuickLRU({
  maxSize: 100,
  maxAge: 1000 * 60 * 5,
});

export default createStartAPIHandler(defaultAPIFileRouteHandler)
