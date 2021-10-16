// NDP Pg 172
// A factory can be used as a generic interface for creating objects
// A factory allows us to separate object creation from 
// object implementation.
// The factory allows us to not expose the constructors of the objects
// it creates and prevents them from being extended or modified.
// This is achieved by only exporting the factory keeping the Constructor private.
// Factories are commonly exposed by modules as a convenient way
// to create new instances eg http.createServer() rather than new http.Server()
function createImage(name) {
    if(name.match(/\.jpeg$/)) {
        return new JpegImage(name)
    }
    if(name.match(/\.gif$/)) {
        return new GifImage(name);
    }
    if(name.match(/\.png$/)) {
        return new PngImage(name);
    }
    else {
        throw new Error('Unsupported image format')
    }
}

function Image(name) {
    this.name = name;
}

function JpegImage(name) {
    Image.call(this, name)
    this.format = 'jpeg'
}

function PngImage(name) {
    Image.call(this)
    this.format = 'png'
}


Object.setPrototypeOf(JpegImage, Image)

module.exports = createImage