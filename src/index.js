module.exports = function check(str, bracketsConfig) {
  let chars = str.split(""),
    stack = [],
    open = [],
    close = [],
    closeIndex,
    openIndex;

  // Создаем массивы для открытых и закрытых скобок
  bracketsConfig.forEach((config) => {
    open.push(config[0]);
    close.push(config[1]);
  });

  // Проходимся по строке, проверяя каждый ее символ.
  for (let i = 0, len = chars.length; i < len; i++) {
    openIndex = open.indexOf(chars[i]);
    closeIndex = close.indexOf(chars[i]);

    if (openIndex !== -1) {
      // Нашли открывающую скобку. Помещаем ее в стек.
      if (
        openIndex === closeIndex &&
        stack.length > 0 &&
        stack[stack.length - 1] === openIndex
      ) {
        // Если это одинаковая скобка и она уже в стеке, закрываем ее
        stack.pop();
      } else {
        stack.push(openIndex);
      }
      continue;
    }

    if (closeIndex !== -1) {
      // Нашли закрывающую скобку. Проверяем ее соответствие открывающей .
      openIndex = stack.pop();
      if (closeIndex !== openIndex) {
        return false;
      }
    }
  }

  // Проверяем дисбаланс открытых/закрытых скобок .
  if (stack.length !== 0) {
    return false;
  }

  return true;
};
