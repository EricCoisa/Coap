// Mapeamento de tokens para compressão customizada
const tokenMap: Record<string, string> = {
  attributes: 'a',
  insert: 'i',
  ops: 'o',
  color: 'c',
  background: 'b',
  align: 'al',
  header: 'h',
  font: 'f',
  size: 's',
  bold: 'bd',
  italic: 'it',
  underline: 'u',
  strike: 'st',
  link: 'lk',
  image: 'im',
  video: 'v',
  list: 'ls',
  blockquote: 'bq',
  'code-block': 'cb',
  clean: 'cl',
};

const reverseTokenMap: Record<string, string> = Object.fromEntries(
  Object.entries(tokenMap).map(([k, v]) => [v, k])
);

function preprocess(obj: any): any {
  if (Array.isArray(obj)) return obj.map(preprocess);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [tokenMap[k] || k, preprocess(v)])
    );
  }
  return obj;
}

function postprocess(obj: any): any {
  if (Array.isArray(obj)) return obj.map(postprocess);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [reverseTokenMap[k] || k, postprocess(v)])
    );
  }
  return obj;
}
import pako from "pako";

// Compactar JSON em código usando gzip (pako)
export function encodeJson<T>(obj: T): string {
  const preprocessed = preprocess(obj);
  const json = JSON.stringify(preprocessed);
  const compressed = pako.deflate(json);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(compressed)));
  return encodeURIComponent(base64);
}

// Descompactar código em JSON usando gzip (pako)
export function decodeJson<T>(code: string): T | null {
  try {
    const bin = atob(decodeURIComponent(code));
    const buf = new Uint8Array([...bin].map(c => c.charCodeAt(0)));
    const decompressed = pako.inflate(buf, { to: "string" });
    const postprocessed = postprocess(JSON.parse(decompressed));
    return postprocessed as T;
  } catch {
    return null;
  }
}
