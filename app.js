let $ = document.querySelector.bind(document);

const reposUrl = "https://api.github.com/orgs/you-apps/repos";
const membersUrl = "https://api.github.com/orgs/you-apps/members";

const fetchJson = async (url) => {
  const resp = await fetch(url);
  return await resp.json();
}

const loadRepos = async () => {
  const repos = await fetchJson(reposUrl);
  repos.sort((a, b) => a.stargazers_count < b.stargazers_count);
  for (let repo of repos) {
    if (!repo.name.includes("You")) continue;

    let newHTML = `
      <a class="card" href="${repo.html_url}">
        <img src="https://raw.githubusercontent.com/you-apps/${repo.name}/main/fastlane/metadata/android/en-US/images/icon.png">
        <div>
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
        </div>
        <span class="stars"><img src="assets/star.svg">${repo.stargazers_count}</span>
      </a>
    `;
    $("#apps > div").innerHTML += newHTML;
  }
}

const loadMembers = async () => {
  const members = await fetchJson(membersUrl);
  for (let member of members) {
    let newHTML = `
      <a class="card" href=${member.html_url}>
        <img src=${member.avatar_url}>
        <h3>${member.login}</h3>
      </a>
    `;
    $("#team > div").innerHTML += newHTML;
  }
}

loadRepos();
loadMembers();
