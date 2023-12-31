export const formatDate = (message) => {
  const newdate = new Date(message.timestamp);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
    newdate
  );

  return formattedTime;
};
