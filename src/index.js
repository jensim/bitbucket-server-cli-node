import {ask} from "./questions/questioneer";

(async () => {
    let answers = await ask();
    console.info(JSON.stringify(answers, null, '\t')); // TODO Do not print
})();
