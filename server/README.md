# software-daily.server

**Slack:** https://software-daily.slack.com/messages/server/

This module houses the code that serves the single-page app and provides the REST API for the future [softwaredaily.com](http://softwaredaily.com).

### Who wants to get started?

This module of the project has yet to be started. The main requirements are to write a server application that will provide the REST API for the client to interact with, as well as serve the single-page app. It's possible that we could break these up into two separate components, if people think it's worthwhile.

I've been researching the [jsonapi.org](http://jsonapi.org) specification, which looks very promising. It's effectively a spec of guidelines and conventions for writing a JSON API. Anything with strict conventions and open documentation sounds great, because that could make it easier for other people to ramp up on our project. I'd be interested to hear what other people think about the spec.

Our data models / database schema are not complete yet, so the main work that can be done right this moment would be setting up the framework so that we could fill in the blanks later.

If you'd like to work on this portion of Software Daily, feel free to join the Slack team and post a message to the [#server](https://software-daily.slack.com/messages/server/) channel.
