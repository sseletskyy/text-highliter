= Inside that directory, you can run several commands =

Starts the development server:
`npm start`

Builds the app for production:
`npm run build`

Run production build:
`npx serve -s build`

Run unit tests:
`npm t`

Run e2e tests (cypress) (dev server should be running)
1) in console:
`npm run cypress:ci`
2) in browser:
`npm run cypress`

Run e2e tests (cypress) on CI (dev server with start and stop automatically):
`npm run e2e:ci`