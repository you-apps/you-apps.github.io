let element = document.querySelector.bind(document);

const reposUrl = "https://api.github.com/orgs/you-apps/repos";
const membersUrl = "https://api.github.com/orgs/you-apps/members";

async function fetchJson(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

async function loadRepos() {
  const repos = await fetchJson(reposUrl);
  repos.sort((a, b) => a.stargazers_count < b.stargazers_count);

  for (const repo of repos) {
    if (!repo.name.includes("You")) continue;

    const apps = `
      <a class="card" href="${repo.html_url}">
        <img src="https://raw.githubusercontent.com/you-apps/${repo.name}/main/fastlane/metadata/android/en-US/images/icon.png" alt="${repo.name} icon">
        <div>
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
        </div>
        <span class="stars"><img src="assets/star.svg" alt="Star icon">${repo.stargazers_count}</span>
      </a>
    `;

    element("#app-list").innerHTML += apps;
  }
}

async function loadMembers() {
  const members = await fetchJson(membersUrl);

  for (const member of members) {
    const team = `
      <a class="card" href="${member.html_url}">
        <img src="${member.avatar_url}" alt="${member.login} avatar">
        <h3>${member.login}</h3>
      </a>
    `;

    element("#member-list").innerHTML += team;
  }
}

loadRepos();
loadMembers();
