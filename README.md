# flux-astromesh

# Required

node >= 18.17

## Setup

Make sure to install the dependencies:

# yarn

yarn install-all

## Development Server

Start the development server on `http://localhost:3000`:

# yarn

yarn dev

## Production

Build the application for production:

# yarn

yarn build

Locally preview production build:

# yarn

yarn preview

# upload to s3

aws s3 sync --delete .output/public s3://bazaar.fluxnft.space/
aws cloudfront create-invalidation --distribution-id E3QSPZD8Y16R9G --paths "/\*"
