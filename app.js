//API Key: b93f69f6b5070fdea1c558202a18ae1e



//1. Take input from user
$(document).ready(function () {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        // get the text the user submitted
        var userText = $(this).find('#user-text').val();
        console.log(userText);
        getTrackIDsByArtist(userText, displaySearchData);
    });
});


//2. Make the api call with the input from the user
function getTrackIDsByArtist(userText, callback) {

    $.ajax({
        type: "GET",
        data: {
            apikey: "b93f69f6b5070fdea1c558202a18ae1e",
            q_artist: userText,
            format: "jsonp"
        },
        url: "http://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        contentType: 'application/json',
        success: callback,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};

function getLyricsByTrackID(trackID) {


};

//3. Show the api results in a repository

function displaySearchData(data) {

    console.log(data.message.body.track_list);
    //    console.log(data.message.body.track_list[0].track.album_coverart_350x350)
    //    console.log(data.message.body.track_list[0].track.lyrics_id)
    //    var rand = data.message.body.track_list[Math.floor(Math.random() * data.message.body.track_list.length)];
    //    console.log(rand.track.track_id)
    //    var thisTrack = (rand.track.track_id)
    //    var thisPic = rand.track.album_coverart_350x350;
    //    console.log(thisPic)
    //
    //    var p = document.createElement("p");
    //    p.textContent = thisTrack;
    //    p.id = thisTrack;
    //
    //    var img = document.createElement("img")
    //    img.setAttribute("src", thisPic)
    //
    //    document.getElementById("lyrics").appendChild(p).style.opacity = 0;
    //    document.getElementById("lyrics").appendChild(img);
    //    document.getElementById("ghost").click();





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



            if (item.track.lyrics_id === 0) {
                $("#lyric").text("no id");
                //resultElement += '<p class="lyric">no id</p>';
            } else {
                $.ajax({
                        type: "GET",
                        data: {
                            apikey: "b93f69f6b5070fdea1c558202a18ae1e",
                            track_id: item.track.lyrics_id,
                            format: "jsonp"
                        },
                        url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
                        dataType: "jsonp",
                        contentType: 'application/json',
                        success: function (data) {
                            $(".lyric").text("success");
                            //resultElement += '<p class="lyric">success</p>';
                            var dataString = JSON.stringify(data);
                            //                    console.log(trackID, data, dataString.lenght, data.message.body.length, data.message.body.lyrics.lyrics_body);
                            console.log(item.track.lyrics_id, data, dataString.length);
                            if (dataString.length > 90) {
                                console.log("inside dataString.length");
                                if (data.message.body.lyrics.lyrics_body !== "") {
                                    console.log("inside data.message.body.lyrics.lyrics_body");
                                    $(".lyric").text(data.message.body.lyrics.lyrics_body);
                                    //resultElement += '<p class="lyric">???' + data.message.body.lyrics.lyrics_body + '</p>';
                                    //$(".lyric").text("???");
                                } else {
                                    console.log("inside ELSE data.message.body.lyrics.lyrics_body");
                                    $(".lyric").text("empty");
                                    //resultElement += '<p class="lyric">empty</p>';
                                }
                            } else {
                                console.log("inside ELSE dataString.length");
                                $(".lyric").text("lyric");
                                //resultElement += '<p class="lyric">no</p>';
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $(".lyric").text("error");
                            //resultElement += '<p class="lyric">error</p>';
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }

                    }

                );
            }



            resultElement += '<p id="lyric"></p>'
            resultElement += '</li>';
        });
    }
    //console.log(resultElement);

    $('#search-results').html(resultElement);
}
