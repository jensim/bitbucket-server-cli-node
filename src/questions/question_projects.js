import bitbucket from "../bitbucket";

export default function (prevValues, answers) {
    let projects = bitbucket.getAllProjects(answers);
    projects.push("__ALL__");
    let prev = prevValues["projects"];
    let message = "BitBucket projects";
    return {
        name: "projects",
        message: message,
        default: prev,
        type: "list",
        choices
    }
}
