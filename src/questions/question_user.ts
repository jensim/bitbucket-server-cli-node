import CliAnswer from "./cliAnswer";

export default function (prevValues:CliAnswer) {
    let prev = prevValues["user"];
    let message = "BitBucket username";
    return {
        "name": "user",
        message: message,
        default: prev,
    }
}
