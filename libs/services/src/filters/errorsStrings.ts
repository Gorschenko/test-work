export const getCommonError = (property: string) => ({
  message: `Свойство ${property} отсутствует или является невалидным`,
});

export const getBooleanError = (property: string) => ({
  message: `Тип ${property} должнен быть булевым`,
});

export const getNumberError = (property: string) => ({
  message: `Тип ${property} должнен быть числовым`,
});

export const getStringError = (property: string) => ({
  message: `Тип ${property} должен быть строкой`,
});

export const getArrayError = (property: string) => ({
  message: `Тип ${property} должен быть массивом`,
});

export const getNotEmptyError = (property: string) => ({
  message: `Свойство ${property} должно быть непустым`,
});

export const getMinLengthError = (property: string, length: number) => ({
  message: `Длина или значение ${property} должны быть не меньше или равны ${length}`,
});

export const getMaxLengthError = (property: string, length: number) => ({
  message: `Длина или значение ${property} должны быть не больше или равны ${length}`,
});

export const getExistedEntityError = (entity: string) => `${entity} уже существует`;

export const getNotFoundEntityError = (entity: string) => `${entity} не найден(а)`;

export const getFileExtensionError = () => 'Неверный формат файла';
