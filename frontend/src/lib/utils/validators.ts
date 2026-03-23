// Validation utilities
// To be implemented

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateStudentEmail(email: string): boolean {
  return email.endsWith('@correo.itm.edu.co');
}
