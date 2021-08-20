$(window).on("load", function () {
    var focused = false
    var clicked = null
    var mouseover = null

    $(document).on("click", function (event) {
        if (clicked) {
            clicked.style.background = ""
        }
        focused = true
        clicked = event.target
        clicked.style.background = "yellow"
        var ele = event.target.getBoundingClientRect()
        clicked.top = ele.top
        clicked.bottom = ele.bottom
        clicked.right = ele.right
        clicked.left = ele.left
    });

    $(document).on("keyup", (function (e) {
        if (e.key === "Escape") {
            console.log("escape pressed")
            if (clicked) {
                clicked.style.background = ""
            }
            focused = false
            clicked = null
        }
    }));

    $(document).on("mouseover", function (event) {
        console.log(clicked)
        clearLines()
        mouseover = event.target
        if (focused) {
            drawAxes(clicked, mouseover)
        }
    });

    function clearLines() {
        var lines = document.getElementsByClassName('line')
        while (lines[0]) {
            lines[0].parentNode.removeChild(lines[0])
        }
    }

    function drawAxes(click, hover) {
        var clickTop = click.top
        var clickLeft = click.left
        var clickBottom = click.bottom
        var clickRight = click.right

        ele = hover.getBoundingClientRect()
        var hoverTop = ele.top
        var hoverLeft = ele.left
        var hoverBottom = ele.bottom
        var hoverRight = ele.right

        var drawRight = drawLeft = drawTop = drawBottom = false

        if (hoverLeft < clickLeft && hoverRight > clickRight) {
            drawRight = drawLeft = true
        }
        else {
            if (hoverRight < clickLeft) {
                drawLeft = true
            }
            if (hoverLeft > clickRight) {
                drawRight = true
            }
        }
        if (hoverTop < clickTop && hoverBottom > clickBottom) {
            drawTop = drawBottom = true
        }
        else {
            if (hoverBottom < clickTop) {
                drawTop = true
            }
            if (hoverTop > clickBottom) {
                drawBottom = true
            }
        }
        if (drawTop && drawBottom) {
            linedraw(click.left + ((click.right - click.left) / 2), hoverTop, click.left + ((click.right - click.left) / 2), clickTop)
            linedraw(click.left + ((click.right - click.left) / 2), clickBottom, click.left + ((click.right - click.left) / 2), hoverBottom)
        }
        else if (drawTop) {
            linedraw(click.left + ((click.right - click.left) / 2), click.top, click.left + ((click.right - click.left) / 2), hoverBottom)
        }
        else if (drawBottom) {
            linedraw(click.left + ((click.right - click.left) / 2), hoverTop, click.left + ((click.right - click.left) / 2), clickBottom)
        }
        if (drawLeft && drawRight) {
            linedraw(hoverLeft, clickTop + (clickBottom - clickTop) / 2, clickLeft, clickTop + (clickBottom - clickTop) / 2)
            linedraw(hoverRight, clickTop + (clickBottom - clickTop) / 2, clickRight, clickTop + (clickBottom - clickTop) / 2)
        }
        else {
            if (drawLeft) {
                linedraw(hoverRight, clickTop + (clickBottom - clickTop) / 2, clickLeft, clickTop + (clickBottom - clickTop) / 2)
            }
            if (drawRight) {
                linedraw(clickRight, clickTop + (clickBottom - clickTop) / 2, hoverLeft, clickTop + (clickBottom - clickTop) / 2)
            }
        }

    }

    function linedraw(x1, y1, x2, y2) {
        if (x2 < x1) {
            var tmp;
            tmp = x2; x2 = x1; x1 = tmp;
            tmp = y2; y2 = y1; y1 = tmp;
        }

        var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var m = (y2 - y1) / (x2 - x1);

        var degree = Math.atan(m) * 180 / Math.PI;

        document.body.innerHTML += "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: 1px; background: red; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'>" + Math.round(lineLength) + "</div>";
    }
});