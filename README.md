# Team Cannon Project

<h1>Fire Takes<h1>

<img src="">

<h2><u>Overview:</u><h2>
<h4>Fire Takes is the world's most popular album-review site, where users can share their opinions on today's hottest new releases and the greatest hits of yesterday. Users can search for albums to see current opinions, stream samples (or entire tracks, thanks to our partners over at Spotify), and add their own reviews. Registered users have a history of albums they have reviewed and are able to contribute to the growing conversation. </h4>

</br>

<h2><u>Meet Team Cannon!</u></h2>

<h3>Cainan Barboza</h3>
<b>Role:</b> Lead back-end organization. API calls, database management, and routing (????) 
</br>

<h3>Micah Peterson</h3>
<b>Role:</b> Primary UI/UX development. HTML and CSS styling, animations, UI development, and functionality.
</br>

<h3>Dan Gelok</h3>
<b>Role:</b> Project management and back-end support. Authentication, database setup and management, and design.


</br>
</br>
</br>

<h2><u>Tools used in the project:</u></h3>
<h3>Languages:</h3>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript (via Node.js)</li>
    <li>SQL (via Sequelize)</li>
</ul>

Modules (for Node.js):
<ul>
    <li>Sequelize</li>
    <li>Express</li>
    <li>EJS</li>
    <li>bcrypt</li>
    <li>bcrypt-js</li>
    <li>body-parser</li>
    <li>cookie-parser</li>
    <li>multer</li>
    <li>pg</li>
    <li>pg-hstore</li>
</ul>


Other:
<ul>
    <li>Node.js</li>
    <li>Sequelize</li>
    <li>GIMP</li>
    <li>Postico</li>
    <li>Postman</li>
    <li>ElephantSQL</li>
</ul>

<h3>APIs</h3>
<ul>
    <li>Spotify API - https://developer.spotify.com/documentation/web-api/</li>
</ul

</br>

<h3><u>Base Objectives:</u></h3>
<ul>
    <li>Users are able to register unique usernames, and sign in and out</li>
    <li>Users are able to search for and access any album available via Spotify API</li>
    <li>Authentication required for submitting new reviews</li>
    <li>All reviews are stored in database and listed each time the corresponding album is searched</li>
    <li>All reviews made by a single user are displayed on profile page</li>
    <li>Navbar shifts between register/profile and login/logout, depending on status</li>
    <li>Team goals: increased communication, smoother version control, more independent development</li>
</ul>

</br>

<h2><u>Stretch Goals Completed:</u></h2>
<ul>
    <li>Users can upload a personal photo to their profile</li>
    <li>Users can listen to 30-second snippets of album tracks via Spotify API - or full tracks, if signed in through Spotify</li>
</ul>

</br>

<h2><u>Stretch Goals Future</u></h2>
<ul>
    <li>Create a cumulative average score from total user reviews</li>
    <li>Place user photo by user reviews on album page</li>
    <li>Enable 'follow' status for albums or artists, with alerts to new reviews</li>
    <li>Provide chat room</li>
    <li>Enable comment responses per review</li>
    <li>Place most recent reviews on landing page</li>
    <li>Place users with highest num of reviews on landing page</li>
</ul>

</br>

<h2><u>Challenges & Solutions:</u><h2>
<h3>Some of the biggest challenges we faced with this project build included:</h2>

<b>Challenge: Simultaneous DB/API calls</b>
<br>
<b>Solution: Refactoring code allowed us to store necessary API data in our database, making only a single call necessary, instead of an initial call to our database and then a followup call to the Spotify API.</b>

<b>Challenge: More advanced design (compared to earlier projects)</b>
<br>
<b>Solution: Additional CSS development provided animations, working with GIMP provided a unique logo, and a series of authentication checks changed </b>

<b>Challenge: Photo uploads</b>
<br>
<b>Solution: Research led us to Multer middleware, and documentation research provided the required solution.</b>

<b>Challenge: We got sick</b>
<br>
<b>Solution: Naps.</b>



</br>

<h2><u>Code Snippets:</u></h2>

<h4>This snippet showcases the declaration of our user Class (including methods and attributes), and demonstrates OOP concepts.</h4>

```
class User{
}

```

</br>




<h2>Screenshots:</h2>
<img src="images/loginPage.png">
<h4>Login and user registration.</h4>
<br />

