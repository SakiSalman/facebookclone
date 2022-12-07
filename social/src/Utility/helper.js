import { validateEmail, validateNumber } from "./validate.js";

// make replace contents
export const replaceData = (data) => {
  if (validateEmail(data)) {
    const mail = data.split("@")[0];
    const host = data.split("@")[1];

    const first = mail.substr(0, 1);
    const last = mail.substr(-2, 2);

    return first + "********" + last + "@" + host;
  }

  if (validateNumber(data)) {
    const first = data.substr(0, 3);
    const last = data.substr(-2, 2);

    return first + "******" + last;
  }
};
