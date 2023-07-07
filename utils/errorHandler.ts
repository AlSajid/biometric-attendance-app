export default function errorHandler(error: any) {
  let msg;
  console.error({ error: error });
  console.error({ errorCode: error.code });

  switch (error.code) {
    case "ECONNREFUSED":
    case "ENOTFOUND":
    case "ETIMEOUT":
    case "EREFUSED":
      msg = "Internet connection is interrupted";
      break;

    case 11000:
      msg = "Duplicate Entry";
      break;

    case 8000:
      msg = "Could not create a new user on the device";

    default:
      msg = "Something went wrong";
  }

  return msg;
}
