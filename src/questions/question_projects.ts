import {BitbucketProject, getAllProjects} from "../bitbucket";
import CliAnswer from "./cliAnswer";

interface ProjectKeyChoice {
    name: string,
    value: string[],
}

export default async function (answers: CliAnswer) {
    let projects: BitbucketProject[] = await getAllProjects(answers);

    let allKeys: string[] = projects.map(p => p.projectKey);
    let choises: ProjectKeyChoice[] = projects.map(p => {
        return {
            name: `${p.projectName} (${p.projectKey})`,
            value: [p.projectKey],
        };
    });
    choises.unshift({name: "All projects..", value: allKeys});
    let message = "BitBucket projects";
    return {
        'name': 'projects',
        'message': message,
        'type': 'list',
        'choices': choises
    }
}
