const consultHeaders = () => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PNEUMACARE_TOKEN}`,
  };
};

export default consultHeaders;
