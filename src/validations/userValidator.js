export function userValidator(user) {
  if (!user?.name || !user?.age) return "UserForm"
  return 'Dashboard'
}
