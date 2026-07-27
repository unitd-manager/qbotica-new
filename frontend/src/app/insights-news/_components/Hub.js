'use client';

import { useState } from 'react';
import FilterBar from './FilterBar';
import Featured from './Featured';
import ResourceGrid from './ResourceGrid';
import BlogGrid from './BlogGrid';

/*
 * Holds the shared filter + search state.
 * Clicking a filter updates BOTH the Featured panel and the grid below.
 * The "Blog" category swaps in a dedicated photo-card layout (BlogGrid)
 * with industry sub-tabs; every other category uses the hub's ResourceGrid.
 */
export default function Hub() {
  const [current, setCurrent] = useState('all');
  const [query, setQuery] = useState('');
  const [blogSub, setBlogSub] = useState('all');

  function handleFilter(id) {
    setCurrent(id);
    if (id !== 'blog') setBlogSub('all'); // reset industry tab when leaving Blog
  }

  return (
    <>
      <FilterBar current={current} onFilter={handleFilter} query={query} onSearch={setQuery} />
      <Featured current={current} />
      {current === 'blog' ? (
        <BlogGrid blogSub={blogSub} onSelectSub={setBlogSub} query={query} />
      ) : (
        <ResourceGrid current={current} query={query} />
      )}
    </>
  );
}
