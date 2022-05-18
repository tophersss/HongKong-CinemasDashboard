export const groupBy = (arr, key) => {
    const initialValue = {};
    console.log(`groupBy running`)
    return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval];
        return acc;
    }, initialValue);
};