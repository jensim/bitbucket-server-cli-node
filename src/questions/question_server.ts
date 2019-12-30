import CliAnswer from "./cliAnswer";

export default function (prevValues:CliAnswer) {
    let prev = prevValues["server"];
    let message = "BitBucket server";
    let defa = undefined;
    if(prev){
        defa = prev;
    }else{
        message = `${message} <https://vcs.my-company.com>`;
    }
    return {
        "name": "server",
        message: message,
        default: defa,
        validate: function (input:string) {
            if(input == undefined || input == ''){
                return 'Input in mandatory'
            }
            if((!input.startsWith('http://')) && !input.startsWith('https://')){
                return 'server address must start with http:// or https://';
            }
            if(input.endsWith('/')){
                return 'server address must not end in trailing slash';
            }
            return true;
        }
    }
}
