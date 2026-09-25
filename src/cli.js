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
      return `Pushed changes to ${activity.repo.name}`;
    }

    case 'WatchEvent':
      return `Starred ${activity.repo.name}`;

    case 'CreateEvent':
      return `Created ${activity.payload.ref_type} in ${activity.repo.name}`;

    case 'DeleteEvent':
      return `Deleted ${activity.payload.ref_type}`;

    case 'ForkEvent':
      return `Forked ${activity.repo.name}`;

    case 'IssuesEvent':
      return `${activity.payload.action[0].toUpperCase() + activity.payload.actions.slice(1)} a new issue in ${activity.repo.name}`;

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