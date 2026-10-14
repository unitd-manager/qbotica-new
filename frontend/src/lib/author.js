// Builds the author box data from the WP REST post (fetched with _embed).
// Photo comes from an ACF user image field "author_photo" (object or URL);
// the Gravatar placeholder is deliberately ignored. Bio is the WP user's
// "Biographical Info"; designation is the optional ACF user field "author_designation".
export function getAuthorProfile(post) {
  const author = post?._embedded?.author?.[0];
  if (!author?.name) return null;

  const photo = author.acf?.author_photo;
  let photoUrl = typeof photo === 'string' ? photo : photo?.url || '';

  // Fall back to the WP Profile Picture. d=404 makes Gravatar return an error
  // instead of its grey placeholder, so the box shows initials in that case.
  if (!photoUrl && author.avatar_urls) {
    const sizes = Object.keys(author.avatar_urls).map(Number).sort((a, b) => b - a);
    const avatar = author.avatar_urls[sizes[0]] || '';
    photoUrl = avatar.includes('gravatar.com')
      ? avatar.replace(/([?&])s=\d+/, '$1s=240').replace(/([?&])d=[^&]*/, '$1d=404')
      : avatar;
  }

  return {
    name: author.name,
    bio: author.description || '',
    designation: author.acf?.author_designation || '',
    linkedin: author.acf?.author_linkedin || '',
    photo: photoUrl,
  };
}
