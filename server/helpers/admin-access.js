const ADMIN_EMAILS = new Set([
  "vickyyadav5383@gmail.com",
  "aniketkumar704216@gmail.com",
  "beautifulmolds@gmail.com",
]);

const isAdminUser = (user) => {
  const email = typeof user?.email === "string" ? user.email.trim().toLowerCase() : "";
  return user?.role === "admin" || ADMIN_EMAILS.has(email);
};

const getUserRole = (user) => (isAdminUser(user) ? "admin" : user?.role || "user");

module.exports = { isAdminUser, getUserRole };
