const API: string = process.env.REACT_APP_API_URI as string;

/**
 *  API POST Function
 * @param {object} payload user payload
 * @returns {object} api response
 */
const submit = async (payload: object) => {
  console.log(API);
  let statusCode: number;
  const response: any = await fetch(API, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => {
    statusCode = res.status;
    return res.json()
  }).then(res => ({ statusCode, ...res}))
  return response;
};

export default submit;
