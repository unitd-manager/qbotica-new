import React from 'react';

const allowedPropNames = new Set([
  'id',
  'title',
  'role',
  'tabIndex',
  'name',
  'value',
  'type',
  'placeholder',
  'disabled',
  'href',
  'target',
  'rel',
  'src',
  'alt',
  'width',
  'height',
  'style',
  'onClick',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseDown',
  'onMouseUp',
  'onScroll',
  'onChange',
  'onInput',
  'dangerouslySetInnerHTML',
]);

function filterProps(props) {
  if (!props) return {};
  const out = {};
  Object.keys(props).forEach((k) => {
    if (k.startsWith('data-') || k.startsWith('aria-') || allowedPropNames.has(k)) {
      out[k] = props[k];
    }
  });
  return out;
}

export const PTag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <p className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </p>
));
PTag.displayName = 'PTag';

export const SectionTag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <section className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </section>
));
SectionTag.displayName = 'SectionTag';


export const DivTag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <div className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </div>
));
DivTag.displayName = 'DivTag';

export const SpanTag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <span className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </span>
));
SpanTag.displayName = 'SpanTag';

export const H1Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <h1 className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </h1>
));
H1Tag.displayName = 'H1Tag';

export const H2Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => {
  // Prepare props but handle dangerouslySetInnerHTML specially so we can
  // remove a trailing dot from titles rendered into H2 across the site.
  const props = filterProps(rest);

  // Helper to strip a single trailing period from plain text while preserving
  // ellipses ('..' or '...') and abbreviations.
  const stripTrailingDot = (text) => {
    if (typeof text !== 'string') return text;
    const trimmed = text.replace(/\s+$/, '');
    if (trimmed.endsWith('..')) return trimmed; // preserve ellipses or double dots
    if (trimmed.endsWith('.')) return trimmed.slice(0, -1);
    return trimmed;
  };

  // If caller used dangerouslySetInnerHTML, sanitize the HTML string by
  // removing a single trailing dot that may appear before optional closing tags.
  if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
    let raw = String(props.dangerouslySetInnerHTML.__html);
    // Trim trailing whitespace
    raw = raw.replace(/\s+$/, '');
    // Extract trailing closing tags (e.g., </span></strong>) so we can inspect
    // the visible text before them.
    const trailingTags = [];
    let m;
    const tagRe = /(<\/[^>]+>)$/;
    while ((m = raw.match(tagRe))) {
      trailingTags.unshift(m[1]);
      raw = raw.slice(0, -m[1].length).replace(/\s+$/, '');
    }

    // If the visible text ends with a single dot (not '..'), remove it.
    if (raw.endsWith('..')) {
      // leave as-is for ellipses
    } else if (raw.endsWith('.')) {
      raw = raw.slice(0, -1);
    }

    const sanitized = raw + trailingTags.join('');
    const safeProps = { ...props };
    delete safeProps.dangerouslySetInnerHTML;
    return (
      <h2 className={className} style={style} ref={ref} {...safeProps} dangerouslySetInnerHTML={{ __html: sanitized }} />
    );
  }

  // For plain children, strip trailing dot if present on string children
  const content = Array.isArray(children)
    ? children.map((c) => (typeof c === 'string' ? stripTrailingDot(c) : c))
    : (typeof children === 'string' ? stripTrailingDot(children) : children);

  // Render with filtered props (which won't include dangerouslySetInnerHTML here)
  return (
    <h2 className={className} style={style} ref={ref} {...props}>
      {content}
    </h2>
  );
});
H2Tag.displayName = 'H2Tag';

export const H3Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <h3 className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </h3>
));
H3Tag.displayName = 'H3Tag';

export const H4Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <h4 className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </h4>
));
H4Tag.displayName = 'H4Tag';

export const H5Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <h5 className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </h5>
));
H5Tag.displayName = 'H5Tag';


export const ULTag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <ul className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </ul>
));
ULTag.displayName = 'ULTag';

export const LITag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <li className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </li>
));
LITag.displayName = 'LITag';

export const ATag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <a className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </a>
));
ATag.displayName = 'ATag';