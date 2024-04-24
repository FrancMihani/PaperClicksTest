export const isIRI = (string: string): boolean =>
  /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[\w.-]*)*\/?$/.test(string)
