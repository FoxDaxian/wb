module.exports = function(content, map, meta) {
    return content.replace(/\[name\]/g, "'fox'");
};
