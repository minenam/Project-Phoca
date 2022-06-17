import axios from "axios";

async function post(endpoint: string, data: object) {
  console.log(
    `%cPOST 요청: ${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
    "color: #296aba;",
  );
  console.log(`%cPOST 요청 데이터: ${JSON.stringify(data)}`, "color: #296aba;");

  return axios.post(process.env.NEXT_PUBLIC_SERVER_URL + endpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function get(endpoint: string, params = "", queryParams = {}) {
  console.log(
    `%cGET 요청 ${
      process.env.NEXT_PUBLIC_SERVER_URL + endpoint + "/" + params
    }`,
    "color: #a25cd1;",
  );

  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + endpoint + "/" + params,
    {
      params: queryParams,
    },
  );
}

export { post, get };
