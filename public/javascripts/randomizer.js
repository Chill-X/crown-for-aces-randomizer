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
        var label = song[0];
        var checked = document.getElementById('defaultCheckbox').checked;
        // Default songs and final stage songs only (Rinon CSPs are locked) if checked
        if (diff >= lower && diff <= upper && (checked || label == '' || (label == 'FIN SEC' && i != 1))) {
          if (songList[diff - lower] == null) {
            songList[diff - lower] = [];
          }
          songList[diff - lower].push(song[1] + ' [' + difficulties[i] + ' - ' + diff + ']');
        }
      }
    });

    songList.map((diff) => {
      console.log(diff.length);
    })

    // Get random songs according to count
    for (var i = 0; i < count; i++) {
      // Uniform distribution across
      var diffIndex = Math.floor(Math.random() * songList.length);
      var songIndex = Math.floor(Math.random() * songList[diffIndex].length);
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