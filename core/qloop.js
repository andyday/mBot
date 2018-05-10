module.exports = (playing, q) => {
    let loop = setInterval(loopfnc, 1000);
    
    function loopfnc () {
        if (!playing && q.isEmpty) clearInterval(loop);
    }
}