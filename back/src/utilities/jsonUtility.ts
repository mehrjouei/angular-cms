export function jsonify(object: object | string) {
    if (typeof object === "object") {
        return object;
    } else if (typeof object === "string") {
        return JSON.parse(object);
    }
}