// ProductImage: shows a product photo. If the photo can't load (missing file, typo),
// it shows the product's emoji in a tinted box instead, so the layout never breaks.
// Used by ProductList (big card photo), Cart, and Receipt (small thumbnails).

import { useState } from 'react'

// Props:
//   src        - path to the photo, e.g. "/images/ballpen.jpg"
//   emoji      - backup picture, e.g. "🖊️"
//   alt        - description for screen readers ("" = decorative, the name is already shown next to it)
//   className  - size/shape classes from the parent (e.g. "h-12 w-12 rounded-lg")
//   emojiSize  - text size class for the emoji (e.g. "text-5xl")
function ProductImage({ src, emoji, alt, className = '', emojiSize = 'text-2xl' }) {
  // Becomes true if the browser fails to load the photo
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={'flex items-center justify-center bg-linear-to-br from-brand-50 to-amber-50 ' + className}
        // Only announce the emoji if the image was meant to be described
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : 'true'}
      >
        <span className={emojiSize}>{emoji}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy" // only download when it's about to appear on screen
      decoding="async"
      onError={() => setFailed(true)} // switch to the emoji if loading fails
      className={'object-cover ' + className}
    />
  )
}

export default ProductImage
