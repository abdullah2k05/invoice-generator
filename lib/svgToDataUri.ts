export const svgToDataUri = (svgString: string) => {
  try {
    const base64 = btoa(unescape(encodeURIComponent(svgString.trim())));
    return `data:image/svg+xml;base64,${base64}`;
  } catch {
    return "";
  }
};
