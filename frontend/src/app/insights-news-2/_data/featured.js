// Content for the Featured panel. Each key matches a filter id.
// className drives the panel background; badgeClass drives the badge color;
// image is the photo shown to the right of the copy;
// url is where the "Read/View/Watch" button goes.
//
// All and Media both point at the upcoming webinar per the client's request -
// same artwork, same "Upcoming Event" pill.

// Drop the artwork into /public/assets/images and put its filename here — the
// panel falls back to the plain gradient while `image` is empty, so it never
// shows a broken frame.
// `fixed` pins the panel to this copy instead of following the newest card -
// All and Media both promote the upcoming webinar.
const UPCOMING_EVENT = {
  fixed: true,
  // Artwork already carries the headline, date and CTA - show it on its own.
  imageOnly: true,
  badge: 'Upcoming Event',
  badgeClass: '',
  title: 'The Secret to Scalable AI: Security, Cost & Data Management',
  image: '/assets/images/featured-webinar.jpeg',
  link: 'Register now →',
  url: '#', // TODO: registration link
};

export const FEATURED = {
  all: {
    ...UPCOMING_EVENT,
    image: '/assets/images/all.png',
    heading: 'What’s new at qBotica',
    intro: '',
    className: '',
  },
  press: {
    heading: 'Latest press release',
    intro: '',
    badge: 'Press Release',
    badgeClass: '',
    className: '',
    title: 'qBotica and Atolio partner to power AI agents with secure enterprise knowledge',
    image: '/assets/images/featured-press-release.png',
    link: 'Read the press release →',
    url: 'https://www.qbotica.com/newsroom/qbotica-and-atolio-partner-to-power-ai-agents-with-secure-instant-access-to-enterprise-knowledge',
  },
  recognition: {
    heading: 'Latest recognition',
    intro: '',
    badge: 'Recognition',
    badgeClass: 'gold',
    className: 'recognition',
    title: 'qBotica recognized as a UiPath Agentic Automation Fast Track Partner',
    image: '/assets/images/featured-recognition.png',
    link: 'View the recognition →',
    url: 'https://www.qbotica.com/newsroom/qbotica-recognized-as-a-uipath-agentic-automation-fast-track-partner',
  },
  blog: {
    heading: 'Latest from the blog',
    intro: '',
    badge: 'Blog · Agentic AI',
    badgeClass: 'blog',
    className: 'blog',
    title: 'From automation to agentic operations: what changes for enterprise teams?',
    image: '/assets/images/featured-blog.png',
    link: 'Read the blog →',
    url: '/blog',
  },
  media: {
    ...UPCOMING_EVENT,
    heading: 'Latest media',
    intro: '',
    className: 'media',
  },
};
