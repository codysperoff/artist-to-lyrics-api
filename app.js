//API Key: b93f69f6b5070fdea1c558202a18ae1e



//1. Take input from user
$(document).ready(function () {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        // get the text the user submitted
        var userText = $(this).find('#user-text').val();
        console.log(userText);
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
            url: "http://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            contentType: 'application/json'
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
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


};

//3. Show the api results in a repository

function displaySearchData(data) {

    console.log(data.message.body.track_list);


    var resultElement = '';
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
            console.log(resultElement);



            if (item.track.lyrics_id === 0) {
                //$(".lyric").text("no id");
                resultElement += '<p class="lyric">no id</p>';
                console.log(resultElement);
            } else {
                var result = $.ajax({
                        /* update API end point */
                        type: "GET",
                        data: {
                            apikey: "b93f69f6b5070fdea1c558202a18ae1e",
                            track_id: item.track.lyrics_id,
                            format: "jsonp"
                        },
                        url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
                        dataType: "jsonp",
                        contentType: 'application/json'
                    })
                    /* if the call is successful (status 200 OK) show results */
                    .done(function (result) {
                        /* if the results are meeningful, we can just console.log them */
                        console.log(result);

                        //$(".lyric").text("success");
                        resultElement += '<p class="lyric">success</p>';
                        console.log(resultElement);
                        var dataString = JSON.stringify(data);
                        //                    console.log(trackID, data, dataString.lenght, data.message.body.length, data.message.body.lyrics.lyrics_body);
                        console.log(item.track.lyrics_id, data, dataString.length);
                        //success - it has some text inside
                        if (dataString.length > 90) {
                            console.log("inside IF dataString.length");
                            //success - it has lyrics inside
                            if (data.message.body.lyrics.lyrics_body !== "") {
                                console.log("inside IF data.message.body.lyrics.lyrics_body");
                                //$(".lyric").text(data.message.body.lyrics.lyrics_body);
                                resultElement += '<p class="lyric">???' + data.message.body.lyrics.lyrics_body + '</p>';
                                console.log(resultElement);
                                //$(".lyric").text("???");
                            }
                            //failure - has text but no lyrics
                            else {
                                console.log("inside ELSE data.message.body.lyrics.lyrics_body");
                                //$(".lyric").text("empty");
                                resultElement += '<p class="lyric">failure - has text but no lyrics</p>';
                                console.log(resultElement);
                            }
                        }
                        //failure - has no text and no lyrics
                        else {
                            console.log("inside ELSE dataString.length");
                            //$(".lyric").text("lyric");
                            resultElement += '<p class="lyric">failure - not text no lyrics</p>';
                            console.log(resultElement);
                        }

                    })
                    /* if the call is NOT successful show errors */
                    .fail(function (jqXHR, error, errorThrown) {
                        //$(".lyric").text("error");
                        resultElement += '<p class="lyric">error</p>';
                        console.log(resultElement);
                        console.log(jqXHR);
                        console.log(error);
                        console.log(errorThrown);
                    });
            }

            resultElement += '</li>';
        });
    }
    //console.log(resultElement);

    $('#search-results').html(resultElement);
}


//example of non call back api call
