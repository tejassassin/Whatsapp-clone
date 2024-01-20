export const formatDate = (timestamp) => {
  const newdate = new Date(timestamp);

  //   2024-01-19T16:45:38.359Z  => 5:40 PM
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
