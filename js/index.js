var baseURI = 'https://github.com/mcslof/peoplespavers/master/data/';
// var baseURI = 'http://localhost:63342/peoplespavers/data/';

var application = new Vue({
    el: '#application',
    data: {
        tiles: [],
        error: ""
    }
});

var emptyTileIdx = 0;

function emptyTile() {
    emptyTileIdx++;
    return {
        id: "emptyTile" + emptyTileIdx,
        class: "tile-empty",
        image: ""
    };
}


$.get(baseURI + "tiles.json")
    .done(function (data) {
        application.error = "";
        try {
            data = JSON.parse(data);
        } catch (_) {}
        console.log(data);
        data = data.map(function (tile) {
            tile.image = baseURI + "images/" + tile.image;
            tile.class = "tile";
            return tile;
        });
        var tiles = [];
        var alternating = true;
        data.forEach(function (tile, idx) {
            tiles.push(tile);
            if ((idx + 1) % 4 === 0) {
                if (alternating) {
                    tiles.push(emptyTile());
                    tiles.push(emptyTile());
                }
                alternating = !alternating;
            }
        });
        application.tiles = tiles;
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message !== application.error) {
            application.error = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });