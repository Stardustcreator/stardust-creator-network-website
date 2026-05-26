export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required.';

  const unmet: string[] = [];
  if (password.length < 8) unmet.push('at least 8 characters');
  if (!/[A-Z]/.test(password)) unmet.push('one uppercase letter');
  if (!/[a-z]/.test(password)) unmet.push('one lowercase letter');
  if (!/[0-9]/.test(password)) unmet.push('one number');
  if (!/[^A-Za-z0-9]/.test(password)) unmet.push('one special character');

  if (unmet.length > 0) return `Password must contain: ${unmet.join(', ')}.`;
}
