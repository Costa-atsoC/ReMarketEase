const formatDate = (fullDate?: string) => {
  if (fullDate) {
    console.log(fullDate);
    const date = fullDate.split("T")[0];
    const hour = fullDate.split("T")[1].split(".")[0];
    return { date, hour };
  }
  const dateToFormat = Date().split(" ");
  const month = months[dateToFormat[1]];
  const date = dateToFormat[3] + "-" + month + "-" + dateToFormat[2];
  return { date, hour: dateToFormat[4] };
};

const searchBarPage = (path: string) => {
  if (paths[path.split("/")[1]] == "no") return false;
  return true;
};

const months: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

const paths: { [key: string]: string } = {
  profile: "no",
  login: "no",
  default: "yes",
};
export { formatDate, searchBarPage };
