import axios from "axios";

// Send sms from BULK SMS BD API

export const sendSMS = async (number, message) => {
  try {
    await axios.post(
      `https://bulksmsbd.net/api/smsapi?api_key=BNDo8M4o7RuRFzy2mKuc&type=text&number=${number}&senderid=03590002777&message=${message}`
    );
  } catch (error) {
    console.log(error);
  }
};
