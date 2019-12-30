import CliAnswer from "./questions/cliAnswer";
import * as Request from "request-promise";
import {RequestPromiseOptions} from "request-promise";

export async function loadRepos(answers: CliAnswer): Promise<BitbucketRepo[]> {
    let responsePromises: Promise<BitbucketRepoResponse>[] = answers.projects.map(project => {
        let url = getReposUrl(answers.server, project);
        return Request.get(url, getHeaders(answers)).promise().catch((_: any) => {
            console.error(`Failed getting repos for project ${project}`);
            return null;
        });
    });
    let responses = await Promise.all(responsePromises);
    return responses.filter((v: BitbucketRepoResponse) => v != null)
        .map((response: BitbucketRepoResponse) => response.values)
        .flat();
}

export async function getAllProjects(answers: CliAnswer): Promise<BitbucketProject[]> {
    let url = getProjectsUrl(answers.server);
    let response = await Request.get(url, getHeaders(answers)).promise().catch(error => {
        console.error(`Failed loading projects :: ${error.message}`);
        process.exit(1);
    });
    //console.log(JSON.stringify(response));
    return response.result;
}

function getReposUrl(host: string, project: string): string {
    return `${host}/rest/api/latest/projects/${project}/repos?limit=10000`;
}

function getProjectsUrl(host: string): string {
    return `${host}/rest/categories/latest/projects?start=0&limit=10000`;
}

function getHeaders(answers: CliAnswer): RequestPromiseOptions {
    const authorization = Buffer.from(`${answers.user}:${answers.password}`).toString('base64');
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${authorization}`,
        },
        strictSSL: false,
        json: true,
    };
}

export interface BitbucketRepoLink {
    href: string,
    name: string,
}

interface BitbucketRepoLinks {
    clone: BitbucketRepoLink[],
}

export interface BitbucketRepo {
    slug: string,
    id: number,
    name: string,
    scmId: string,
    state: string,
    statusMessage: string,
    forkable: boolean,
    public: boolean,
    links: BitbucketRepoLinks,
    project: BitbucketRepoProject,
}

export function repoPath(repo: BitbucketRepo): string {
    return `${repo.project.key}/${repo.slug}`;
}

export function cloneLink(repo: BitbucketRepo): BitbucketRepoLink {
    return repo.links.clone.reduce((prev: BitbucketRepoLink, curr: BitbucketRepoLink) => {
        if (prev == undefined) {
            return curr;
        }
        if (prev.name == 'ssh') {
            return prev;
        }
        if (curr.name == 'ssh') {
            return curr;
        }
        return undefined;
    });
}

interface BitbucketRepoResponse {
    "size": number,
    "limit": number,
    "isLastPage": boolean,
    "values": BitbucketRepo[],
}

interface BitbucketProjectResponse {
    message: string,
    result: BitbucketProject[],
}

export interface BitbucketProject {
    projectId: number,
    projectKey: string,
    projectName?: string,
    projectDescription?: string,
}

export interface BitbucketRepoProject {
    id: number,
    key: string,
    name?: string,
    description?: string,
}
