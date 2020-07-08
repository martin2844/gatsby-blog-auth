# Gatsby Blog Firebase Auth / CodigoMate blog
Welcome to this repo!
This is basically a gatsby blog, but it has some quite nice added extra perks.

This blog features:

* Gatsby Image
* Markdown posts, you own all your content
* Pagination for blog posts
* Blog posts thumbs
* Tag and Category navigation
* Breadcrumbs
* Post comments
* User interaction by firebase including comments on posts, user dashboard with user avatar and user display names.
* All home made components, no component libraries for UI
* Smart 404.js page, thanks to [Sam Larsen](https://sld.codes/articles/Rethinking-404-Pages)
* Mobile Side bar menu

### History

1. New Branch codigoMate, will make this idea my actual blog since its a nice idea
2. Ui Refactoring -> inspired on designshack
3. Header planning - algorithm for dynamic menu creation
4. Index Page - planning, just the latest 10-12 tuts - some more info below - maybe courses in the future
5. Idea 30 dias de react
6. Cat and Tag pages - Cat Page first
7. Prism JS
8. State management for breadcrumbs
9. Breadcrumbs to global state. Now working.
10. Pagination working on url level. Must add page numbers on the bottom. 
11. Page no's added to bottom. Must add Prev and Next buttons, and style it a bit better. Must add follwoing format < 1 2 3 ... 188 >
12. Created regex check for paginated breadcrumbs. Created Custom Buttton component.
13. Some media queries, added logo
14. Added mobile menu - still needs some retouching


July:
1. Added merge true to DB handling in profile
2. Separated pro, paid and free markdown from normal. If md has type then its a course
3. Added pro categories for user DB
4. Created checkPro hook.
5. Added courses createPage
6. Added course page, must format post display. But post query has correct filter







## Ideas to implement

For the courses section we'll have two types of courses free and paid.
Courses will be structured in markdown, so on gatsby node on the markdown loop we will have to create an if statement to separate courses from normal blog posts.

If (format === course) {

    if(type === free) {
         create page @ /courses/free/blblblbl
    } else {
       if(type === paid) {

       } else {

       }
    }

} else {
    create page @ /tutoriales/
}

also, .gitignore - avoid pushing paid courses. Actually this would not work since netlify uses git repo to push. Either fork repo when integration is done, and create new private repo with that or make repo private


## Handle pro

user: pro - not only true but array of numbers corresponding to courses id.
So on checkpro we'll check if the number inside the array corresponds to the course they are trying to buy or see.
In /preview/course we'll have the preview of the course if the user is not pro on that course, if the user is pro on that course we will redirect to that course
Also inside profile we will have your courses, if user has a course, we'll filter paid courses through graphql using state and user's pro data.