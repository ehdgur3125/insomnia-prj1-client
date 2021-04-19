module.exports = {
  sleep: (t) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(t);
      }, t);
    }),
};
