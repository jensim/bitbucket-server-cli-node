import {BitbucketRepo, BitbucketRepoLink, cloneLink, repoPath} from "./bitbucket";

async function clone(repo: BitbucketRepo) {
    return;
}

async function fetch() {

}

export default async function update(repo: BitbucketRepo) {
    try {
        let link: BitbucketRepoLink = cloneLink(repo);
        let path = repoPath(repo);
        console.log(`Try to clone ${link.href} into ${path}`);
        // TODO
    } catch (e) {
        console.log(`Failed updating repo ${repo.project.key}/${repo.slug}`);
        console.error(e);
    }
}
