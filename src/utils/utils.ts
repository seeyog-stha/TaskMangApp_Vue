const getStore = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error while getting the value:", error);
    return null;
  }
};

const setStore = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log("Error while setting value in store ", error);
    return false;
  }
};
const removeStore = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log("Error while removeing value in store", error);
    return false;
  }
};
