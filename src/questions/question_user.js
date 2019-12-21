
export default function (prevValues) {
    let prev = prevValues["user"];
    let message = "BitBucket username";
    return {
        name: "user",
        message: message,
        default: prev,
    }
}
