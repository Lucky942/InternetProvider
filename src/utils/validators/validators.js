export const required = (value) => {
    if(value) return undefined;
    return "Field is required";
};

export const onlyNumbers = (value) => {
    if(+value <= 0 || !((+value ^ 0) === +value) || !parseInt(value)) return "Число должно быть целым и больше 0";
    return undefined;
};

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return  `Max length is ${maxLength} symbols`;
    return undefined;
};