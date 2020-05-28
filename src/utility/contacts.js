export const constructList = (contacts) => {
    const list = [];
    for (let i = 0;i < contacts.length; i++) {
        const user = contacts.item(i);
        list.push({ ...user });
    }
    return list;
}
