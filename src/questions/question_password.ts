export default {
    "name": "password",
    "message": "BitBucket Server password",
    "type": "password",
    "mask": "🔑",
    "validate": function(input:string){
        if(input){
            return Promise.resolve(true);
        }else{
            return Promise.reject("Must provide a password");
        }
    },
}
