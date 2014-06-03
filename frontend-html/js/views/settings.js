// Declaration section (I know, this is so much old school)
var language         = document.getElementById("language")
var showQualityList  = document.getElementById("show-quality")
var moviesQuality    = document.getElementById("movies-quality")
var subtitleLanguage = document.getElementById("subtitle-language")
var subtitleSize     = document.getElementById("subtitle-size")
var apiEndPoint      = document.getElementById("api-endpoint")
var connectionLimit  = document.getElementById("connection-limit")
var dhtLimit         = document.getElementById("dht-limit")
var tmpFakeFolder    = document.getElementById("fake-cache")
var tmpChangeFolder  = document.getElementById("cache-directory")
var tmpClearFolder   = document.getElementById("tmp-folder")

// Data persistence
saveData = function(value, id){
    this.val = value;
    this.el  = id;

    console.log(this.val + " - " + this.el);
}

// Set language
Hammer(language).on("tap", function(){
    Hammer(language).on("change", function(e){
        // Mode appellation = true ($)
        saveData($(language).val(), e.currentTarget.id)

        // Vanilla
        // saveData(language.options[e.selectedIndex].value, e.currentTarget.id)
    })
})

// Show movie quality on list
Hammer(showQualityList).on("tap", function(){
    $(this).toggleClass("checked")
})

// Movies quality
Hammer(moviesQuality).on("tap", function(){
    console.log("hello tap!")

    Hammer(moviesQuality).on("change", function(){
        console.log("hello change!")
    })
})

// Default subtitle
Hammer(subtitleLanguage).on("tap", function(){
    console.log("hello tap!")

    Hammer(subtitleLanguage).on("change", function(){
        console.log("hello change!")
    })
})

// Subtitle size
Hammer(subtitleSize).on("tap", function(){
    console.log("hello tap!")

    Hammer(subtitleSize).on("change", function(){
        console.log("hello change!")
    })
})

// API Endpoint
Hammer(apiEndPoint).on("tap", function(){
    console.log("hello tap!")

    Hammer(apiEndPoint).on("blur", function(){
        console.log("hello blur!")
    })
})

// Connection Limit
Hammer(connectionLimit).on("tap", function(){
    console.log("hello tap!")

    Hammer(connectionLimit).on("blur", function(){
        console.log("hello blur!")
    })
})

// DHT Limit
Hammer(dhtLimit).on("tap", function(){
    console.log("hello tap!")

    Hammer(dhtLimit).on("blur", function(){
        console.log("hello blur!")
    })
})

// Cache directory
Hammer(tmpChangeFolder).on("tap", function(){
    console.log("hello tap!")

    Hammer(tmpChangeFolder).on("change", function(){
        if( tmpChangeFolder.value != "" ){
            tmpFakeFolder.value = tmpChangeFolder.value
        }
    })
})

// Clear tmp folder
Hammer(tmpClearFolder).on("tap", function(){
    $(this).toggleClass("checked")
})

// Buttons
var flushBookmarks = document.getElementsByClassName("flush-bookmarks")[0]
var flushSubtitles = document.getElementsByClassName("flush-subtitles")[0]
var flushDatabases = document.getElementsByClassName("flush-databases")[0]
var resetSettings  = document.getElementsByClassName("reset-settings")[0]

Hammer(flushBookmarks).on("tap", function(){
    console.log("hello there!")
})

Hammer(flushSubtitles).on("tap", function(){
    console.log("hello there!")
})

Hammer(flushDatabases).on("tap", function() {
    console.log("hello there!")
})

Hammer(resetSettings).on("tap", function(){
    console.log("hello there!")
})

/* We can use the https://github.com/EightMedia/jquery.hammer.js / Example

* var hamer_options = {};

* $("#test")
*     .hammer(hamer_options)
*     .on("tap", function(ev) {
*         $(this).toggleClass("checked")
*     })
*/
