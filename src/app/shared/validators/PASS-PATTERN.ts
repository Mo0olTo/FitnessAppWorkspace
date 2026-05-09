export const PASS_PATTERN = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export function passwordValidator(value: string): boolean {
  return PASS_PATTERN.test(value);
}
