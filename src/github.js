async function getContent(repo, sha, path) {
  const contentResponse = await fetch(
    `https://api.github.com/repos/${repo}/contents${path}?ref=${sha}`
  );
  const contentJson = await contentResponse.json();
  const content = window.atob(contentJson.content);
  return { content, url: contentJson.html_url };
}

export async function getHistory(repo, sha, path, top = 10) {
  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repo}/commits?sha=${sha}&path=${path}`
  );
  const commitsJson = await commitsResponse.json();
  const commits = commitsJson.map(commit => ({
    sha: commit.sha,
    date: new Date(commit.commit.author.date),
    author: {
      login: commit.author.login,
      avatar: commit.author.avatar_url
    },
    commitUrl: commit.html_url,
    message: commit.commit.message
  }));

  await Promise.all(
    commits.slice(0, top).map(async commit => {
      const info = await getContent(repo, commit.sha, path);
      commit.content = info.content;
      commit.fileUrl = info.url;
    })
  );

  return commits;
}