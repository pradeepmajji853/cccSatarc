// Basic HTML sanitization function
export function sanitizeHtml(html: string): string {
    // Remove potentially dangerous tags and attributes
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .replace(/on\w+=[^>\s]*/gi, '')
      .replace(/javascript:[^\s>]*/g, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/position\s*:\s*fixed/gi, 'position:relative')
      .replace(/position\s*:\s*absolute/gi, 'position:relative')
      .replace(/top\s*:\s*\d+/gi, '')
      .replace(/left\s*:\s*\d+/gi, '');
  }