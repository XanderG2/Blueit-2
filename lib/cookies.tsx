export const getCookieValue = (name) => {
  if (typeof document !== 'undefined') {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  }
}