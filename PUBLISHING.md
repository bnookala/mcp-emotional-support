# Publishing MCP Emotional Support

This document outlines the process for building and publishing the MCP Emotional Support server to NPM.

## Prerequisites

- Node.js 18.0.0+
- NPM account with publishing permissions
- Git repository properly configured

## Building for Production

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the TypeScript:**
   ```bash
   npm run build
   ```

3. **Verify the build:**
   ```bash
   ls -la dist/
   # Should see index.js and other compiled files
   ```

4. **Test the binary:**
   ```bash
   node dist/index.js
   # Should see: "MCP Emotional Support Server running on stdio"
   ```

## Publishing Process

### 1. Version Management

Update the version in `package.json`:
```bash
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

### 2. Pre-publish Checks

- Ensure all tests pass (if applicable)
- Verify `dist/` directory is built and up-to-date
- Check that `.gitignore` properly excludes `node_modules/` and temporary files
- Confirm `package.json` has correct metadata

### 3. Publish to NPM

```bash
# Login to NPM (if not already logged in)
npm login

# Publish the package
npm publish

# For scoped packages or beta versions:
# npm publish --tag beta
```

### 4. Verify Publication

- Check the package page: https://www.npmjs.com/package/mcp-emotional-support
- Test installation: `npm install -g mcp-emotional-support`
- Verify binary works: `mcp-emotional-support --help` (if help is implemented)

## Post-Publication

1. **Update README.md** with the new NPM installation instructions
2. **Tag the release** in Git:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. **Create GitHub release** (optional but recommended)

## Claude Desktop Configuration

After publishing, users can configure Claude Desktop with:

```json
{
  "mcpServers": {
    "emotional-support": {
      "command": "npx",
      "args": ["mcp-emotional-support"]
    }
  }
}
```

## Troubleshooting

### Build Issues
- Ensure TypeScript is properly installed: `npm install -g typescript`
- Check for TypeScript errors: `npx tsc --noEmit`

### Publishing Issues
- Verify NPM authentication: `npm whoami`
- Check package name availability: `npm view mcp-emotional-support`
- For permission errors, ensure you're logged in to the correct NPM account

### Runtime Issues
- Test the server locally before publishing
- Verify all dependencies are listed in `package.json`
- Check Node.js version compatibility

## Development Workflow

For ongoing development:

1. Make changes to source files in `src/`
2. Build: `npm run build`
3. Test locally with Claude Desktop
4. Commit changes: `git add . && git commit -m "Description"`
5. Version bump: `npm version patch`
6. Publish: `npm publish`
7. Push to Git: `git push && git push --tags`

## Package Metadata

Ensure `package.json` contains:
- Correct `name`, `version`, `description`
- Proper `bin` configuration for the CLI
- Accurate `keywords` for discoverability
- Valid `license` and `author` information
- Correct `repository` URL
- Appropriate `engines` specification