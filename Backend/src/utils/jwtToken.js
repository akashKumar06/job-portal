async function sendToken(user, statusCode, res, message) {
  const token = user.generateAccessToken();

  const options = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(statusCode)
    .cookie("token", token)
    .json({ success: true, user, message, token });
}

export { sendToken };
