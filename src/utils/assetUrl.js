// Builds the full URL for a file in the public/ folder.
// import.meta.env.BASE_URL is the "base" from vite.config.js:
//   locally and on GitHub Pages it is "/Scenario-5-Campus-Convenience-Store-POS/"
// so assetUrl('logo.svg') -> "/Scenario-5-Campus-Convenience-Store-POS/logo.svg".
// Never start the path with "/", or it would skip the repository folder and break on GitHub Pages.
export function assetUrl(path) {
  return import.meta.env.BASE_URL + path
}
