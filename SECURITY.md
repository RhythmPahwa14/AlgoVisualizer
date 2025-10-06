# Security Policy

## Environment Variables

This project uses environment variables to store sensitive configuration data. **Never commit API keys or secrets directly in the source code.**

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# GitHub API (for contributor data)
VITE_GITHUB_TOKEN=your_github_token_here

# RapidAPI (for Java code execution)
VITE_RAPIDAPI_KEY=your_rapidapi_key_here

# Other configuration
VITE_GITHUB_REPO=YourUser/YourRepo
VITE_API_URL=your_api_url_here
```

### Getting API Keys

#### RapidAPI Key (for Java Code Runner)
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Judge0 CE API](https://rapidapi.com/judge0-official/api/judge0-ce)
3. Copy your API key from the dashboard
4. Add it to your `.env.local` file

#### GitHub Token (for contributor data)
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `public_repo` scope
3. Add it to your `.env.local` file

### Security Best Practices

- ✅ Use environment variables for all API keys and secrets
- ✅ Add `.env.local` to `.gitignore` (already done)
- ✅ Use `import.meta.env.VITE_*` to access environment variables
- ❌ Never hardcode API keys in source code
- ❌ Never commit `.env.local` or `.env.production` files
- ❌ Never share API keys in issues, PRs, or documentation

### Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly instead of opening a public issue.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed.