export  function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export  function capitalAllFirstLetter(string) {
    return string.split(' ').map(capitalFirstLetter).join(' ');
}