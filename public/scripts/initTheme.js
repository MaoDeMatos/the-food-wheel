(() => {
  const themeStorage = localStorage.getItem('theme-storage');
  const systemTheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const documentHTMLElement = document.documentElement;

  if (!themeStorage) {
    documentHTMLElement.setAttribute('data-theme', systemTheme);
    localStorage.setItem('theme-storage', JSON.stringify('system'));
    return;
  }

  const storedTheme = JSON.parse(themeStorage);
  if (storedTheme === 'system')
    documentHTMLElement.setAttribute('data-theme', systemTheme);
  else documentHTMLElement.setAttribute('data-theme', storedTheme);
})();
