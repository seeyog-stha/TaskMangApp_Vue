// start of localStorage utils

// getStore is a fucntion to retrive values stored in the localStorage
// it expects one parameters
// key is the name under which the value is stored

export const getStore = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error while getting the value:", error);
    return null;
  }
};

// setStore is a fucntion to add values in the localStorage
// it expects two parameters
// key is the name under which the value is to be stored
// value is the value to be stored
export const setStore = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log("Error while setting value in store ", error);
    return false;
  }
};

// removeStore is a fucntion to remove values stored in the localStorage
// it expects one parameters
// key is the name under which the value is stored
export const removeStore = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log("Error while removeing value in store", error);
    return false;
  }
};

// end of localStorage utils

// start of format date utils

// formatDate is a function to formate the date in order yyyy-mm-dd
// it expects the current timestamp as input
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//  end ot format date utils
