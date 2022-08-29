export const addKey = (arrayObj, objKey, value, objValue) => {
    let result = arrayObj.map((el)=> {
        el[objKey] = value ? value : el[objValue]
        return el
    })
    return result
}
export const removeKey = (arrayObj, objKey) => {
    const newArr = arrayObj.map((item) => {
        delete item[objKey]
        return item
    });
    return newArr
}