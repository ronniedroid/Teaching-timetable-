Teaching Timetable — static site

To publish on Netlify: extract this ZIP, then drag the extracted folder to https://app.netlify.com/drop . There is no build step or external package. Keep all files together at the site root.

To edit the timetable, open index.html in a text editor and change the lessons array. After changing it, change the CACHE value in sw.js (for example, v4 to v5) so an installed offline copy refreshes.

Dates are calculated on the device when opened. Sunday–Thursday show the current teaching week; Friday–Saturday show the coming week.
