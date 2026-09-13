/* Loads shared HTML partials into placeholder elements. */
async function loadComponent(file, elementId) {
  const target = document.getElementById(elementId);
  if (!target) return;

  try {
    const response = await fetch(file);
    if (response.ok) {
      target.innerHTML = await response.text();
    }
  } catch (error) {
    console.error("Error loading component:", file, error);
  }
}

/* Points the share targets at whatever page is actually open, and
   wires the copy-link button. The hrefs in footer.html are the
   no-JavaScript fallback. */
function initShare() {
  const share = document.querySelector(".share");
  if (!share) return;

  const url = window.location.href.split("#")[0];
  const encoded = encodeURIComponent(url);
  const title = encodeURIComponent(document.title);

  const targets = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    x: `https://twitter.com/intent/tweet?url=${encoded}&text=${title}`,
    email: `mailto:?subject=${title}&body=${encoded}`
  };

  for (const [name, href] of Object.entries(targets)) {
    const link = share.querySelector(`[data-share="${name}"]`);
    if (link) link.href = href;
  }

  const copyButton = share.querySelector('[data-share="copy"]');
  const status = share.querySelector(".share-status");
  if (!copyButton) return;

  if (!navigator.clipboard) {
    copyButton.hidden = true;
    return;
  }

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Link copied";
    } catch (error) {
      if (status) status.textContent = "Press ⌘C to copy";
    }
    window.setTimeout(() => {
      if (status) status.textContent = "";
    }, 3000);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  loadComponent("header.html", "header-container");
  await loadComponent("footer.html", "footer-container");
  initShare();
});
