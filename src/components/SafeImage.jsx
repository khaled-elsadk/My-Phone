// src/components/SafeImage.jsx
import React, { useState } from "react";

export default function SafeImage({ src, alt, ...rest }) {
  const [err, setErr] = useState(false);
  const fallback = `https://picsum.photos/seed/fallback-${encodeURIComponent(
    alt || "img"
  )}/800/600`;
  return (
    <img
      src={err ? fallback : src}
      alt={alt}
      onError={() => setErr(true)}
      {...rest}
    />
  );
}
