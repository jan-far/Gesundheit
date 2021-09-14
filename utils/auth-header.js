export default function authHeader(token) {
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
