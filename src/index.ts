import {ask} from "./questions/questioneer";
import {BitbucketRepo, loadRepos} from "./bitbucket";
import update from "./git";

async function work(){
    let answers = await ask();
    //console.info(JSON.stringify(answers, null, '\t')); // TODO Do not print

    let repos: BitbucketRepo[] = await loadRepos(answers);
    let gitRepos: BitbucketRepo[] = repos.filter(r => r.scmId == 'git');
    let promises = gitRepos.map((r: BitbucketRepo) => update(r));
    await Promise.all(promises);
}

work().then(()=>console.info('Done'));
