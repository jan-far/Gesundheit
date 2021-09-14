import fetch from "node-fetch";

const fetchFunction = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

export default fetchFunction;
