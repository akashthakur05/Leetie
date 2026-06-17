import { useEffect, useRef, useCallback, useState } from 'react';

const ITEMS_PER_PAGE = 30;

export function useLazyLoad(items) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // Reset when items change (e.g., due to filtering)
  useEffect(() => {
    setCurrentPage(0);
    setDisplayedItems([]);
    setHasMore(true);
  }, [items.length]);

  // Load initial items
  useEffect(() => {
    if (items.length > 0 && displayedItems.length === 0) {
      loadMore();
    }
  }, [items.length]);

  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIdx = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIdx = nextPage * ITEMS_PER_PAGE;
    const newItems = items.slice(startIdx, endIdx);

    if (newItems.length > 0) {
      setDisplayedItems((prev) => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      
      // Check if there are more items to load
      if (endIdx >= items.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [items, currentPage]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && items.length > displayedItems.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadMore, items.length, displayedItems.length]);

  return {
    displayedItems,
    observerTarget,
    hasMore,
    loadMore,
    loadedCount: displayedItems.length,
    totalCount: items.length,
  };
}
