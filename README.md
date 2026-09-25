# GitHub User Activity

A simple command-line application built with Node.js that fetches a GitHub user's recent public activity and displays it in the terminal.

This project was built as part of the [GitHub User Activity](https://roadmap.sh/projects/github-user-activity) project from roadmap.sh.

## Requirements

- Node.js 22+
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/chochimus/github-user-activity.git
cd github-user-activity
```

Install the project:

```bash
npm install
```

Link the CLI globally:

```bash
npm link
```

The CLI can then be run from any directory.

## Usage

Provide a GitHub username as an argument:

```bash
github-user-activity <username>
```

For example:

```bash
github-user-activity octocat
```

The application fetches the user's recent public GitHub events and displays supported activity in the terminal.

Example output:

```text
- Pushed changes to octocat/Hello-World
- Starred octocat/Spoon-Knife
- Forked octocat/example
- Created branch in octocat/Hello-World
```

Unsupported event types are ignored.

## Supported Activity

The CLI currently formats the following GitHub event types:

- `PushEvent`
- `WatchEvent`
- `CreateEvent`
- `DeleteEvent`
- `ForkEvent`
- `IssuesEvent`

The GitHub Events API contains additional event types that are not currently formatted by this application.

## Error Handling

The CLI reports an error when:

- No username is provided.
- The specified GitHub user does not exist.
- GitHub returns an unsuccessful HTTP response.
- The request to GitHub fails.

For example:

```text
Missing input, username required.
```

or:

```text
Fetch failed: GitHub user "someuser" not found.
```

## Project Structure

```text
github-user-activity/
├── bin/
│   └── github-activity.js    # CLI entry point
├── src/
│   └── cli.js                # Argument parsing, API requests, and output formatting
├── package.json
└── README.md
```

## API

Activity is retrieved using GitHub's public Events API:

```text
https://api.github.com/users/<username>/events
```

The application uses the event type and payload returned by GitHub to transform supported events into human-readable messages.

## Acknowledgments

This project was developed based on the [GitHub User Activity project](https://roadmap.sh/projects/github-user-activity) from roadmap.sh.