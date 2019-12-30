import question_server from "./question_server";
import question_user from "./question_user";
import question_projects from "./question_projects";
import question_password from "./question_password";
import store from "../store";

import * as inquirer from "inquirer";
import {Answers} from "inquirer";
import CliAnswer from "./cliAnswer";


export async function ask(): Promise<CliAnswer> {
    let prevAnswers = await store.read();

    let prompt: inquirer.PromptModule = inquirer.createPromptModule();
    let answers1:Answers = await prompt([
        question_server(prevAnswers),
        question_user(prevAnswers),
        question_password,
    ]);
    let answers2: Answers = await prompt([
        await question_projects(answers1),
    ]);

    let copy = JSON.parse(JSON.stringify(answers1));
    delete copy["password"];
    await store.write(copy);

    return {...answers1, ...answers2};
}
