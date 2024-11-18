import { redirect } from 'next/navigation';
/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

interface FormattedBytes {
  value: number;
  unit: string;
}

export function formatBytes(bytes: number, decimals?: number): FormattedBytes {
  if (bytes == 0) {
    return {
      value: 0,
      unit: 'Bytes',
    };
  }
  const k = 1000,
    dm = decimals || 2,
    sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i],
  };
}

export function formatCO2(co2: number) {
  return co2 < 0.01 ? '<\u20090.01' : co2.toFixed(2);
}
