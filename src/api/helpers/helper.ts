export default {
  generateToken: () => {
    return [...crypto.getRandomValues(new Uint8Array(40))]
      .map((m) => ('0' + m.toString(16)).slice(-2))
      .join('');
  },
};
