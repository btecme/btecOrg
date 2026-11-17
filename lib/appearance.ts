/** Only explicit overrides are persisted; System always means no stored override. */
export const APPEARANCE_KEY = 'btec-appearance';
export type Appearance = 'system' | 'light' | 'dark';
export const APPEARANCE_EVENT = 'btec-appearance-change';

export function applyAppearance(choice: Appearance) {
  const root = document.documentElement;
  root.dataset.appearance = choice;
  root.dataset.theme = choice === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : choice;
  window.dispatchEvent(new Event(APPEARANCE_EVENT));
}

export function saveAppearance(choice: Appearance) {
  try {
    if (choice === 'system') localStorage.removeItem(APPEARANCE_KEY);
    else localStorage.setItem(APPEARANCE_KEY, choice);
  } catch { /* The current page still works without persistence. */ }
  applyAppearance(choice);
}

// Runs in <head>, before body content can paint. No preference is written here.
export const appearanceBootstrap = `(function(){var p='system';try{var s=localStorage.getItem('${APPEARANCE_KEY}');if(s==='light'||s==='dark')p=s}catch(e){}var r=document.documentElement;r.dataset.appearance=p;r.dataset.theme=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p})()`;
