export function capitalizeFirstLetter(string) {
    if(string) return string.charAt(0).toUpperCase() + string.slice(1);
    return ""
}
export function capitalizeText(string) {
    if (!string) return "";
    return string.toUpperCase();
}
