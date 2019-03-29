function randomize(songData) {
  var lower = parseInt(document.getElementById('lower').value);
  var upper = parseInt(document.getElementById('upper').value);
  var count = parseInt(document.getElementById('count').value);
  var songList = [];
  var randomized = [];
  var difficulties = ['Expert', 'Challenge'];

  if (songData.length) {

    // Add songs within difficulty range
    songData.map((song) => {
      for (var i = 0; i < difficulties.length; i++) {
        var diff = parseInt(song[i+6]);
        if (diff >= lower && diff <= upper) {
          if (songList[diff - lower] == null) {
            songList[diff - lower] = [];
          }
          songList[diff - lower].push(song[1] + ' [' + difficulties[i] + ' - ' + diff + ']');
        }
      }
    });

    console.log(songList[0]);
    console.log(songList[1]);

    // Get random songs according to count
    for (var i = 0; i < count; i++) {
      var diffIndex = Math.floor(Math.random() * songList.length);
      console.log(diffIndex);
      var songIndex = Math.floor(Math.random() * songList[diffIndex].length);
      console.log(songIndex);
      randomized.push(songList[diffIndex][songIndex]);
      songList[diffIndex].splice(songIndex, 1);
    }

    // Remove previous songs
    while (document.body.getElementsByTagName('p').length) {
      document.body.removeChild(document.body.lastChild);
    }

    // Append new songs
    randomized.map((song) => {
      var p = document.createElement('p');
      var str = document.createTextNode(song);
      p.appendChild(str);
      p.onclick = function() {
        if (p.style.opacity == '0.25') {
          p.style.opacity = '1.0';
        } else {
          p.style.opacity = '0.25';
        }
      }
      document.body.appendChild(p);
    });

  } else {
    console.log('No data found.');
  }

}