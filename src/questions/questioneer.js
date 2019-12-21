import question_server from "./question_server";
import question_user from "./question_user";
import question_password from "./question_password";
import store from "../store";

const inquirer = require('inquirer');

async function questions() {
    let prevAnswers = await store.read();
    return [
        question_server(prevAnswers),
        question_user(prevAnswers),
        question_password
    ];
}

export async function ask() {
    let prompt = inquirer.createPromptModule();
    let answers = await prompt(await questions());

    let copy = JSON.parse(JSON.stringify(answers));
    delete copy["password"];
    await store.write(copy);

    return answers;
}
