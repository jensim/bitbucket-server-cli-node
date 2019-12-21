export default function (prevValues) {
    let prev = prevValues["server"];
    let message = "BitBucket server";
    let defa = undefined;
    if(prev){
        defa = prev;
    }else{
        message = `${message} <https://vcs.my-company.com>`;
    }
    return {
        name: "server",
        message: message,
        default: defa,
    }
}
