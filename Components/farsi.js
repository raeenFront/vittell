export const ToPersianNumber = (input) => {
  var persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  var persianMap = persianDigits.split("");

  input += "";
  input = input.replace(",", "");
  var x = input.split(".");
  var y = x[0];
  var z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  var separatedNum = y + z;

  return separatedNum.toString().replace(/\d/g, function (m) {
    return persianMap[parseInt(m)];
  });
};

export const toPersianNumber = (input) => {
  var persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  var persianMap = persianDigits.split("");

  input += "";
  input = input.replace(",", "");
  var x = input.split(".");
  var y = x[0];
  var z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  var separatedNum = y + z;

  return separatedNum.toString().replace(/\d/g, function (m) {
    return persianMap[parseInt(m)];
  });
};
