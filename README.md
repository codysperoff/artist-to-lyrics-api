# artist-to-lyrics-api

Thinkful (https://www.thinkful.com) Unit 2 Frontend Web Development Capstone Project - jQuery app integrating with the *musixmatch* Open Platform API.

![desktop-and-mobile-wireframes](https://codysperoff.github.io/artist-to-lyrics-api/readme-images/api-artist-to-lyric-wireframe.jpg)


![home-page-before-search](https://codysperoff.github.io/artist-to-lyrics-api/readme-images/home-page-before-search.png)


![home-page-search-results](https://codysperoff.github.io/artist-to-lyrics-api/readme-images/home-page-search-results.png)


![home-page-no-results](https://codysperoff.github.io/artist-to-lyrics-api/readme-images/home-page-no-results.png)

## Background

I am avid music listener with a wide range in musical taste. I love hearing new music, but I have found that the search for new music can be difficult at times due to the wide range of artists available to listen to. I wanted to create an app that would allow users to search an artist and read through some of their lyrics (provided by MusixMatch) from a random group of their songs. In doing so, I would hope that the user got a better feel of what the artist is like before they went and heard some of their songs.
## Use Case

Why is this app useful? If a user wants to get to know what a certain artist is like before having to listen to several songs, they can read through some of their lyrics to find out, saving them lots of time. Additionally, a user might be able to see whether an artist tends to use profanity/write profane lyrics. This could be useful if the user is trying to put together a family-friendly playlist.
## Initial UX

The initial mobile and desktop wireframes can be seen below:



## Working Prototype

You can access a working prototype of the app here: https://codysperoff.github.io/artist-to-lyrics-api/

## Functionality
The app's functionality includes:

* Listing of a random assortment of 10 songs and/or performances by a musical artist, including a name of the song, album, a link to the musixmatch.com for the full lyrics, as well as a preview of the lyrics.
* The ability for consecutive searches of different artists.
* Suppressing internal links to MusixMatch and key social media sites from the overall results.

## Technical

The app is built entirely in jQuery and makes use of AJAX calls to *The Guardian*'s Open Platform API to return the data. All data is held in memory during the user's session. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* Having a working photograph of the album if the search result is a song and a picture of the band if the search result is a performance.
* Including a link to listen to the song through spotify, last.fm, or another music app.
* Adding an option to share the song lyrics through facebook, twitter, or another social media api.
* Adding a filter to increase/decrease the number of search results that appear.
* Adding a filter to see only songs, only performances, or both.
* Adding a filter to allow users to only view songs from an artist from a certain time period.
* Adding an option for users to annotate a certain lyrics with the help of the Genius API.
