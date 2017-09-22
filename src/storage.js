const RESULT_CODES = {
  win: "w",
  lose: "l",
  draw: "d"
};
const DECODE_RESULT = {
  w: "win",
  l: "lose",
  d: "draw"
};

export const storeHistory = history => {
  if (window.localStorage) {
    window.localStorage.setItem(
      "history",
      history.map(({ result }) => RESULT_CODES[result]).join("")
    );
  }
};

export const getHistory = () => {
  if (!window.localStorage) {
    return [];
  }

  const hist = window.localStorage.getItem("history");
  return hist ? hist.split("").map(c => ({ result: DECODE_RESULT[c] })) : [];
};

export const storeModel = model => {
  if (window.localStorage) {
    window.localStorage.setItem(
      "model",
      JSON.stringify(model)
    );
  }
};

export const getModel = () => {
  if (!window.localStorage) {
    return null;
  }

  const model = window.localStorage.getItem("model");
  return model ? JSON.parse(model) : null;
}