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

export const H2Tag = React.forwardRef(({ children, className = '', style = {}, ...rest }, ref) => (
  <h2 className={className} style={style} ref={ref} {...filterProps(rest)}>
    {children}
  </h2>
));
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
