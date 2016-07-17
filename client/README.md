# software-daily.client

**Join us on Slack:** https://software-daily-slack.herokuapp.com/

This module houses the client (browser) code for the future [softwaredaily.com](http://softwaredaily.com).

### Get started

To get started, clone the repo and install the dependencies.

```
# I've been developing with the latest version
#  of Node.js (the "Current" track), but anything
#  with major versions 4, 5, or 6 should work.

# Clone the repository.
git clone https://github.com/software-daily/software-daily

# Install the client dependencies.
cd software-daily/client
npm i

# Start the dev server at http://localhost:8080.
npm start
```

There are a couple of other `npm` scripts included as well:

```
# Build "./dist/bundle.js" (i.e. for distribution, not using webpack-dev-server).
npm run build

# Run the code linter (ESLint).
npm run lint

# Seed sample data, based on the contents of "./src/sample_data/seed.js".
npm run seed
```

### Sample data

So far, all of the post, tag, and user data is static. You can find the sample data here: `./src/sample_data`.
