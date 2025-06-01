export default function parserData(data: string | null) {
  if (data == null) return;

  let parseData;
  try {
    parseData = typeof data === "string" ? JSON.parse(data) : null;
    return parseData;
  } catch (error) {
    return error;
  }
}
