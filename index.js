//Importing required packages
const prompt = require("prompt-sync")();
const fileNumber = prompt(
  "Enter 1: to proceed with file 1-input or Enter 2: to proceed with file 2-input: "
);

// Importing input file based on user input
let data;
fileNumber == 1 ? (data = require("./1-input")) : (data = require("./2-input"));

// Destructuring variables
const { expenseData, revenueData } = data;
let opt = [];
let finalResult = [];

let startDate = new Date();
let endDate = new Date("1970-05-01T00:00:00.000Z");

// function to get next month
function addMonth(date) {
  let temp = date.getDate();
  date.setMonth(date.getMonth() + +1);
  if (date.getDate() != temp) {
    date.setDate(0);
  }
  return date;
}

// calculating balance for each month
expenseData.map((ele) => {
  startDate =
    new Date(ele["startDate"]).getTime() < startDate.getTime()
      ? new Date(ele["startDate"])
      : startDate;
  endDate =
    new Date(ele["startDate"]).getTime() > endDate.getTime()
      ? new Date(ele["startDate"])
      : endDate;

  if (opt[ele["startDate"]]) {
    opt[ele["startDate"]] -= ele["amount"];
  } else {
    opt[ele["startDate"]] = -ele["amount"];
  }
});

revenueData.map((ele) => {
  startDate =
    new Date(ele["startDate"]).getTime() < startDate.getTime()
      ? new Date(ele["startDate"])
      : startDate;
  endDate =
    new Date(ele["startDate"]).getTime() > endDate.getTime()
      ? new Date(ele["startDate"])
      : endDate;

  if (opt[ele["startDate"]]) {
    opt[ele["startDate"]] += ele["amount"];
  } else {
    opt[ele["startDate"]] = ele["amount"];
  }
});

// calculating difference between first and last month
let monthDifference =
  endDate.getMonth() -
  startDate.getMonth() +
  12 * (endDate.getFullYear() - startDate.getFullYear());

// Pushing values in the finalResult array in sorted order
for (let i = 0; i <= monthDifference; i++) {
  finalResult.push({
    amount: opt[startDate.toISOString()] ?? 0,
    startDate: startDate.toISOString(),
  });
  addMonth(startDate);
}

// showing final result in console
const finalObj = { balance: finalResult };
console.log(finalObj);
