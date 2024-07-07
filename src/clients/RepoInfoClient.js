import BaseHttpClient from "@/clients/BaseHttpClient.js";

export class RepoInfoClient extends BaseHttpClient {
    constructor() {
        super(import.meta.env.VITE_APP_REPO_INFO_API_URL)
    }

    async validateRepo(link) {
        return this.POST('/validateRepo', {body: JSON.stringify({link})})
    }

    async saveRepoGroup(repos, name) {
        const links = repos.map((el) => {
            return el.link
        })

        return this.POST('/createGroup', {body: JSON.stringify({name: name.value, repos: links})})
    }

    async computeDifference(alpha, beta) {
        return this.POST('/computeDifference', {
            body: JSON.stringify({
                alpha: alpha.value,
                beta: beta.value
            })
        })
    }
}

