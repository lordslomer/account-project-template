const otpAsciiCharsSingleton = () => {
  return [
    ...[...Array(26).keys()].map((idx) => idx + 65),
    ...[...Array(10).keys()].map((idx) => idx + 48),
  ];
};
type OtpAsciiCharsSingleton = ReturnType<typeof otpAsciiCharsSingleton>;
const globalForOtpAsciiChars = globalThis as unknown as {
  otpAsciiChars: OtpAsciiCharsSingleton | undefined;
};
const otpAsciiChars =
  globalForOtpAsciiChars.otpAsciiChars ?? otpAsciiCharsSingleton();
export default otpAsciiChars;
if (process.env.NODE_ENV !== 'production')
  globalForOtpAsciiChars.otpAsciiChars = otpAsciiChars;

export const verificationEmailHTML = (username: string, otp: string) => `
<div style='
      background-color: #121212;
      font-family: "Open Sans", sans-serif;
      font-size: x-large;
      overflow: hidden;
      color: white;
      min-height: 50vh;
      '>

  <div style='
      background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
      background-color: #121212;
      border-radius: 4px;
      text-align: center;
      overflow: hidden;
      width: 400px;
      margin: 100px auto;
      padding: 0 25px;
      '>

    <h1 style='color: white;'>Hello ${username}</h1>

    <h5 style='color: white;'>Here is your verification code:</h5>

    <div style='
      background-color: #121212;
      width: fit-content;
      letter-spacing: 20px;
      padding: 0px 20px;
      margin: auto;
      '>
      <h1 style='color: white;'>${otp}</h1>
    </div>

    <h5 style='color: white;'>Welcome To WiseSpend.</h5>
  </div>
</div>`;
