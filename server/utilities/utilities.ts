// regexp for validate url
const urlRegex: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

// validator function to validate incoming url
const validateLink = (link: string): boolean => {
  return urlRegex.test(link) && link.length >= 5;
};

// short link genorator
function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length); // generate random index within the charset
    randomString += charset[randomIndex]; // append the character at the random index
  }

  return randomString;
}

// export for external use
export { validateLink, generateRandomString };
