import question_server from "./question_server";
import question_user from "./question_user";
import question_projects from "./question_projects";
import question_password from "./question_password";
import store from "../store";

const inquirer = require('inquirer');

export async function ask() {
    let prevAnswers = await store.read();

    let prompt = inquirer.createPromptModule();
    let answers1 = await prompt([
        question_server(prevAnswers),
        question_user(prevAnswers),
        question_password
    ]);
    let answers2 = await prompt([
        question_server(prevAnswers),
        question_user(prevAnswers),
        question_password
    ]);

    let copy = JSON.parse(JSON.stringify(answers1));
    delete copy["password"];
    await store.write(copy);

    return answers1;
}
