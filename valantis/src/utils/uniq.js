export default function uniq(arr, getId) {
    const result = [];
    const set = new Set();

    arr.forEach((el) => {
        const id = getId(el);
        if (!set.has(id)) {
            result.push(el);
            set.add(id);
        }
    });

    return result;
}
