//API Key: b93f69f6b5070fdea1c558202a18ae1e




var resultElement = "";
//1. Take input from user
$(document).ready(function () {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        // get the text the user submitted
        var userText = $(this).find('#user-text').val();
        //console.log(userText);
        $('#search-results').html("");
        resultElement = "";
        getTrackIDsByArtist(userText);
    });
});


//2. Make the api call with the input from the user
function getTrackIDsByArtist(userText) {

    var result = $.ajax({
            type: "GET",
            data: {
                apikey: "b93f69f6b5070fdea1c558202a18ae1e",
                q_artist: userText,
                format: "jsonp"
            },
            url: "https://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            contentType: 'application/json'
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            //console.log(result);
            displaySearchData(result);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

};

function getLyricsByTrackID(trackID) {
    var result = $.ajax({
            /* update API end point */
            type: "GET",
            data: {
                apikey: "b93f69f6b5070fdea1c558202a18ae1e",
                track_id: trackID,
                format: "jsonp"
            },
            url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
            dataType: "jsonp",
            contentType: 'application/json'
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            //console.log(result);
            //success - it has some text inside
            if (result.message.body.length !== 0) {
                //console.log("inside IF result.message.body.length");

                //success - it has lyrics inside
                if (result.message.body.lyrics.lyrics_body !== "") {
                    //console.log("inside IF data.message.body.lyrics.lyrics_body");
                    $(".lyric-" + trackID).html(result.message.body.lyrics.lyrics_body);

                }
                //failure - has text but no lyrics
                else {
                    //console.log("inside ELSE data.message.body.lyrics.lyrics_body");
                    $(".lyric-" + trackID).html('Sorry! This song doesn\'t have any lyrics.');
                }
            }
            //failure - has no text and no lyrics
            else {
                //console.log("inside ELSE result.message.body.length");
                $(".lyric-" + trackID).html('Sorry! This song doesn\'t have any lyrics.');
            }
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            $(".lyric-" + trackID).html('Sorry! There was an error accessing the API.');
        });
};



//3. Show the api results in a repository

function displaySearchData(data) {

    //console.log(data.message.body.track_list);

    if (data.message.body.track_list.length == 0) {
        alert("No Results Found!");

    } else {
        data.message.body.track_list.forEach(function (item) {
            //            console.log(item.track.lyrics_id);
            resultElement += '<li>';
            resultElement += '<h2>' + item.track.track_name + ' (' + item.track.lyrics_id + ')</h2>';
            resultElement += '<h3>' + item.track.album_name + '</h3>';
            resultElement += '<h4>' + item.track.artist_name + '</h4>';
            resultElement += '<a href="' + item.track.track_share_url + '" target = "_blank">'; //target blank will open the video in a new window
            resultElement += '<img src ="' + item.track.album_coverart_100x100 + '"/>'; //displays the video's thumbnail
            resultElement += '</a>';



            if (item.track.lyrics_id === 0) {
                resultElement += '<p class="lyric">Sorry! This song doesn\'t have any lyrics.</p>';
            } else {
                resultElement += '<p class="lyric-' + item.track.lyrics_id + '"></p>';
                getLyricsByTrackID(item.track.lyrics_id);
            }

            resultElement += '</li>';
        });
    }

    $('#search-results').html(resultElement);
}
