function array(s){
    var sorted = s.sort((a,b) => a-b)
    var full = sorted[sorted.length - 1] - sorted[0] + 1
    console.log(full - sorted.length)
    return full - sorted.length
}