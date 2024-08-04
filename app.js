const $ = document.querySelector.bind(document);
const x = document.createElement.bind(document);

const reposUrl = "https://api.github.com/orgs/you-apps/repos";
const membersUrl = "https://api.github.com/orgs/you-apps/members";

async function fetchJson(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

async function loadRepos() {
  const repos = await fetchJson(reposUrl);
  repos
    .filter(repo => repo.name.includes("You") && repo.name !== "TriviaYou" && repo.name !=="RecordYou-Magisk-Module")
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .forEach(repo => {
      const a = x("a");
      a.className = "card";
      a.href = repo.html_url;

      const img = x("img");
      img.src = `https://raw.githubusercontent.com/you-apps/${repo.name}/main/fastlane/metadata/android/en-US/images/icon.png`;

      const div = x("div");
      const h3 = x("h3");
      h3.textContent = repo.name;
      const p = x("p");
      p.textContent = repo.description;
      div.append(h3, p);

      const span = x("span");
      span.className = "stars";
      const starIcon = x("img");
      starIcon.src = "assets/star.svg";
      span.append(starIcon, repo.stargazers_count);

      a.append(img, div, span);
      $("#apps > div").appendChild(a);
    });
}

async function loadMembers() {
  const members = await fetchJson(membersUrl);
  for (const member of members) {
    const a = x("a");
    a.className = "card";
    a.href = member.html_url;
    
    const img = x("img");
    img.src = member.avatar_url;
    
    const h3 = x("h3");
    h3.textContent = member.login;
    
    a.append(img, h3);
    $("#team > div").appendChild(a);
  }
}

loadRepos();
loadMembers();
