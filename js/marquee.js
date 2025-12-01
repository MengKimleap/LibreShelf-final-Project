function initSeamlessMarquee(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const originalContentWidth = track.scrollWidth;
  const gap = 24;

  const children = Array.from(track.children);

  children.forEach((child) => {
    const clone = child.cloneNode(true);
    // Mark clones so we don't re-clone them if this script runs twice
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  // Create a unique keyframe name
  const animationName = `scroll-${trackId}`;

  // Create the style element
  const styleSheet = document.createElement("style");

  const moveDistance = originalContentWidth + gap;

  const keyframes = `
        @keyframes ${animationName} {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${moveDistance}px); }
        }
    `;

  // Apply the animation class logic
  const animationClass = `
        #${trackId} {
            animation: ${animationName} 30s linear infinite;
        }
        /* Pause logic for the parent group hover */
        .group:hover #${trackId} {
            animation-play-state: paused;
        }
    `;

  styleSheet.textContent = keyframes + animationClass;
  document.head.appendChild(styleSheet);
}
