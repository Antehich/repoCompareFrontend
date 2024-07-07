export const appendNewGroupToLocalStorage = ({id}, name) => {
    const storage = JSON.parse(localStorage.getItem('myGroups')) ?? {}

    const newGroups = {...storage, [id]: name}

    localStorage.setItem('myGroups', JSON.stringify(newGroups))

    return newGroups
}
