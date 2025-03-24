
    setTimeout(videovisible, 3000);

    function videovisible() {
        document.getElementById('loading').style.display = 'none';
    }

    document.addEventListener("DOMContentLoaded", () => {
        const e = document.querySelector("video"),
            n = e.getElementsByTagName("source")[0].src,
            o = {};
        if (Hls.isSupported()) {
            var config = {
                maxMaxBufferLength: 100,
            };
            const t = new Hls(config);
            t.loadSource(n), t.on(Hls.Events.MANIFEST_PARSED, function(n, l) {
                const s = t.levels.map(e => e.height);
                o.quality = {
                    default: s[0],
                    options: s,
                    forced: !0,
                    onChange: e => (function(e) {
                        window.hls.levels.forEach((n, o) => {
                            n.height === e && (window.hls.currentLevel = o);
                        });
                    })(e)
                };
                new Plyr(e, o);
            }), t.attachMedia(e), window.hls = t;
        } else {
            new Plyr(e, o);
        }
    });
// Disable Right Click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable View Source using keyboard shortcuts
document.onkeydown = function(e) {
    if (e.keyCode == 123) {  // F12 Key
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67)) {  // Ctrl+U, Ctrl+C
        return false;
    }
};

// Prevent text selection
document.addEventListener('mousedown', function(e) {
    if (e.button == 2) { // Right-click
        e.preventDefault();
    }
});

// Disable Inspect Element and View Source
window.onload = function() {
    document.body.onkeydown = function(event) {
        if (event.keyCode == 123 || (event.ctrlKey && event.shiftKey && event.keyCode == 73)) {
            event.preventDefault();
            alert('Inspect element is disabled!');
        }
    };
};
