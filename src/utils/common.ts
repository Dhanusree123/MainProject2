export const getASIN = (url: string) => {
    const queryParts = url.split('?');
    const newUrl = queryParts[0] ? queryParts[0] : '';
    let asin = '';
  
    let splitter = '/dp/';
    if (newUrl.includes('/gp/product/')) {
      splitter = '/gp/product/';
    }
    const urlParts = newUrl.split(splitter);
    if (urlParts[1]) {
      const asinParts = urlParts[1].split('/');
      asin = asinParts[0] ? asinParts[0] : '';
    }
    return asin;
  };