export  function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export  function capitalAllFirstLetter(string) {
    return string.split(' ').map(capitalFirstLetter).join(' ');
}


export function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email address

    if (email.trim() === "") {
        return {
            status: false,
            message: "Email is required"
        }
    }

    if (!email.match(emailRegex)) {
        return {
            status: false,
            message: "Email must be a valid email address"
        }
    }
    return {
        status: true,
        message: "success"
    }
}