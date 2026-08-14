// Top-of-page category summary (the "stats" row) and the filter buttons.
// Edit copy here without touching layout components.

export const CATEGORY_STATS = [
  { name: 'Press Release', desc: 'Company announcements and strategic updates' },
  { name: 'Recognition', desc: 'Awards, rankings and analyst validation' },
  { name: 'Blog', desc: 'AI, automation and industry perspectives' },
  { name: 'Media', desc: 'Videos, webinars, demos and interviews' },
];

// The 4 clear categories (+ All). `id` matches each resource's `category`.
export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'press', label: 'Press Release' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'blog', label: 'Blog' },
  { id: 'media', label: 'Media' },
];
