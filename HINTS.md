# Hints and Tips :tada:

1. Some keys to remember:

   1. Must use a MySQL Database with the Sequelize ORM
   2. Must use Heroku for deployment, including the MySQL Database.
   3. _Must use one new package/library/technology that we haven’t discussed_

      1. That means we can't use something we're used to like Passport or Sequelize as we've covered them.:wink: Perhaps a testing library, or an animation library? A quick google for JavaScript libraries revealed this [article]('https://hackr.io/blog/top-javascript-libraries')

      > We've got a lot more flexibility for packages now that we're using NPM. Maybe we want something that translates responses to a different language? Just ensure that any package you pick, you try it out first before trying to integrate it with the project.

1. We used Draw.io previously for the project, but we can make use of prototyping software such as Proto.io which has a free trial and also [Adobe XD](https://www.adobe.com/products/xd.html#) which is free. This software allows you to easily drag and drop a layout together, on a sized canvas based on device such as an iPhone or a 1920x1080 screen. You can hook the screens up so that you can interact with the prototype.

1. We're dealing with databases so making something like an ERD will be super useful to represent and visualise our database structure! We can do this with Draw.io using the 'Entity Relation Diagram' tooling where you get boxes prebuilt as a database table.

1. Think about using some kind of management platform you want to use for the project. Using an instant messenger is not good enough for planning what each person is doing, neither is passing around a plan.txt file!

   > We have used some lightweight tools before such as [Trello](https://trello.com/) and [Asana](https://asana.com/) and which are very easy to setup and run with!

   Essentially you want the following steps setup for tracking what's going on:

   1. **To Do** _(Tasks that need to be done)_
   1. **In Progress** _(Tasks that are in progress and assigned to someone)_
   1. **Review** _(Tasks that are done, waiting for someone to approve a merge request)_
   1. **Done** _(Tasks that are finished)_

   Both Trello and Asana have the ability to assign a user to the card/ticket that is in progress, and they both have label functionality to ensure 'at a glance' readability for the board or easy identification of tickets related to say 'Frontend' or 'Backend' or 'Deployment'.

1. This is going to be all about communication, if no one talks, if someone has an issue, and doesn't talk to the rest of the team about it, you're going to have a bad time. Just because we're virtual and online doesn't mean we're not available, and we can't talk.

   > It can be difficult to admit defeat and reach out for help, but in a group environment, you're only as fast as your slowest member, so make sure everyone's is striving for success.

1. Use GitFlow for this homework, when you start to create a new feature you should checkout a branch `feature/your_feature_name` and then that branch is purely related to this feature. Not other features. When you find a bug, you would create this as a branch such as `bugfix/bugfix_name` and if you're about to release you'd make a branch called as `release/release_name`

---

# Submission Checklist :rocket:

1. Ensure that you submit both a link to your homework repo **and** your live heroku deployment link.
   > Check for sneaky console errors!
   > Check that it works before you submit it.
2. Ensure what you've submitted works when you grade it yourself against the:

   - The user stories provided
   - The acceptance criterias provided in the README.

3. Make sure your homework repo has a quality README that _you_ have written, and provide screenshots **and a heroku pages** link! We've got more README sections we can add in now because of the `good_readme_guide.md` we did for Homework 9!

4. Commit after most changes, all that code doesn't just appear first time :wink:

5. **Comment that JavaScript code :pray:**
