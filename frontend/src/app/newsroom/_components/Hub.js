'use client';

import { useState } from 'react';
import FilterBar from './FilterBar';
import Featured from './Featured';
import ResourceGrid from './ResourceGrid';
import MediaGrid from './MediaGrid';

/*
 * Holds the shared filter + search state.
 * Clicking a filter updates BOTH the Featured panel and the grid below.
 *
 * Press Release, Recognition and Blog all share the hub's ResourceGrid cards;
 * Blog just adds a row of industry sub-tabs. Media is the one category with a
 * different treatment (MediaGrid - dark tiles with a play overlay).
 *
 * `resources` comes from the server (see page.js -> fetchNewsroomPageData).
 */
export default function Hub({ resources = [], featured = {}, blogTabs = [] }) {
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
      <Featured current={current} resources={resources} featured={featured} />
      {current === 'media' ? (
        <MediaGrid query={query} resources={resources} />
      ) : (
        <ResourceGrid
          current={current}
          query={query}
          resources={resources}
          blogSub={blogSub}
          onSelectSub={setBlogSub}
          blogTabs={blogTabs}
        />
      )}
    </>
  );
}
