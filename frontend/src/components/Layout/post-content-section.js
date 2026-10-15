'use client';

import { useEffect, useRef, useState } from 'react';
import { DivTag, H1Tag, PTag, SectionTag } from '@/components/Common/HTMLTags';
import './post-author-box.css';

function AuthorPhoto({ photo, name }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  // The image can fail before hydration, in which case onError never fires.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img ref={imgRef} className="author-photo" src={photo} alt={name} onError={() => setFailed(true)} />
    );
  }
  return (
    <DivTag className="author-photo author-initials">
      {name.trim().charAt(0).toUpperCase()}
    </DivTag>
  );
}

export default function PostContentSection({ data }) {
  if (!data) return null;
  const {
    content = '',
    date = '',
    author = '',
    authorProfile = null,
    title = '',
    excert_content = '',
    categories = '',
  } = data;
  const formattedDate = date
  ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : '';
  return (
    <SectionTag className="post-content-section">
      <DivTag className="container">
        <DivTag className="wp-content">
          <DivTag className="blog-info">
            {date && (
              <PTag>
                {formattedDate}
                {author && ` · By ${author}`}
              </PTag>
            )}
            {categories && <PTag dangerouslySetInnerHTML={{ __html: categories }} />}
          </DivTag>
          {title && <H1Tag dangerouslySetInnerHTML={{ __html: title }} />}
          {content && <DivTag dangerouslySetInnerHTML={{ __html: content }} />}
          {authorProfile && (
            <DivTag className="post-author-box">
              <AuthorPhoto photo={authorProfile.photo} name={authorProfile.name} />
              <DivTag>
                <PTag className="author-label">Written by</PTag>
                <PTag className="author-name">{authorProfile.name}</PTag>
                {authorProfile.designation && (
                  <PTag className="author-designation">{authorProfile.designation}</PTag>
                )}
                {authorProfile.bio && (
                  <>
                    <PTag className="author-about-label">About</PTag>
                    <PTag className="author-bio">{authorProfile.bio}</PTag>
                  </>
                )}
                {authorProfile.linkedin && (
                  <a
                    className="author-linkedin"
                    href={authorProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${authorProfile.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </a>
                )}
              </DivTag>
            </DivTag>
          )}
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
