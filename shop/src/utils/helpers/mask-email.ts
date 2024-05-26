export function maskEmail(email: string) {
  // Check if the email is valid
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) return 'Invalid email';

  // Split the email address into username and domain
  const [username, domain] = email.split('@');

  // Check if the username has at least 2 characters
  if (username.length < 2) return 'Invalid email';

  // Mask the first two characters of the username with '*'
  const maskedUsername = username.slice(0, 2) + '**';

  // Reconstruct the masked email address
  const maskedEmail = maskedUsername + '@' + domain;

  return maskedEmail;
}
