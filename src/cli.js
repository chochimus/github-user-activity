async function fetchActivity(username) {
  const url = `https://api.github.com/users/${username}/events`;

  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error(`GitHub user "${username}" not found.`);
  }
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  return response.json();
}

function parseArgs(argv) {
  return {
    username: argv[2],
  }
}
function formatActivity(activity) {
  switch (activity.type) {
    case 'PushEvent': {
      const count = activity.payload.length;
      return `Pushed ${count} commit${count === 1 ? '' : 's'} to ${activity.repo.name}`;
    }

    case 'WatchEvent':
      return `Starred ${activity.repo.name}`;

    case 'CreateEvent':
      return `Created ${activity.payload.ref_type}`;

    case 'DeleteEvent':
      return `Deleted ${activity.payload.ref_type}`;

    case 'ForkEvent':
      return `Forked ${activity.repo.name}`;

    case 'IssuesEvent':
      if (activity.payload.action === 'opened') {
        return `Opened a new issue in ${activity.repo.name}`;
      }

      if (activity.payload.action === 'closed') {
        return `Closed an issue in ${activity.repo.name}`;
      }

      return null;

    default:
      return null;
  }
}

async function run(argv) {
  const {username} = parseArgs(argv);

  if (!username) {
    console.error("Missing input, username required.");
    return;
  }

  try {
  const activity = await fetchActivity(username);
  activity.forEach(activity => {
    let message = formatActivity(activity);
    if (message) console.log(`- ${message}`);
    
  });
  } catch(error) {
    console.error("Fetch failed:", error.message);
  }


}

export { run };