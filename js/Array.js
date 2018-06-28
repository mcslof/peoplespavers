Array.prototype.shuffle = function () {
    var array = this.slice(0);
    var count = array.length, randomnumber, temp;
    while (count) {
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp
    }
    return array;
};
