/*
* max-length.js
* Copyright (C) 2013, Maxim Karpinskiy
*
* This content is released under the MIT License
*/
Node.prototype.maxLengthInput =
NodeList.prototype.maxLengthInput =
maxLengthInput = function() {
    var config = {
        threshold   : 10,
        limit_class : "max-length-exceeded",
        interrupt_after_threshold : true,
        asc : true,
    },
    max_length = function(nodes) {
        var counter = document.querySelector(".max-length-counter");

        if (!counter) {
            counter = document.createElement("span");
            counter.style.display = "none";
            counter.style.position = "absolute";
            counter.classList.add("max-length-counter");
            document.body.appendChild(counter);
        }

        for (var i = 0, len = nodes.length; i < len; i += 1) {
            nodes[i].addEventListener("keypress", function(event) {
                var length = event.currentTarget.value.length;

                if (config.interrupt_after_threshold && length + 1 > config.threshold) {
                    event.currentTarget.value = event.currentTarget.value.substr(0, config.threshold);
                }
            });

            nodes[i].addEventListener("focus", function(event) {
                var left = 0;
                counter.innerHTML = !config.asc
                    ? config.threshold - event.currentTarget.value.length
                    : event.currentTarget.value.length + ' / ' + config.threshold;

                counter.style.display = '';
                left = event.currentTarget.offsetLeft + event.currentTarget.offsetWidth - counter.offsetWidth - 10;
                counter.style.left = left;
                counter.style.top  = event.currentTarget.offsetTop + 5;
            });

            nodes[i].addEventListener("blur", function() {
                counter.style.display = "none";
            });

            nodes[i].addEventListener("keyup", function(event) {
                var len = event.currentTarget.value.length;

                counter.innerHTML = !config.asc ? config.threshold - len : len + ' / ' + config.threshold;

                len > config.threshold ?
                    event.currentTarget.classList.add(config.limit_class) :
                    event.currentTarget.classList.remove(config.limit_class);

                if (config.interrupt_after_threshold) {
                    event.currentTarget.value = event.currentTarget.value.substr(0, config.threshold);

                    counter.innerHTML = !config.asc
                        ? config.threshold - event.currentTarget.value.length
                        : event.currentTarget.value.length + ' / ' + config.threshold;

                    event.currentTarget.classList.remove(config.limit_class);
                }
            });
        }
    },
    retrieve_args = function(c) {
        if (!c) return false;

        if (c.threshold && !isNaN(c.threshold)) {
            config.threshold = parseInt(c.threshold, 10);
        }

        config.limit_class = c.limit_class || config.limit_class;
        config.interrupt_after_threshold = typeof c.interrupt_after_threshold === "boolean" ? c.interrupt_after_threshold : config.interrupt_after_threshold;
        config.asc = typeof c.asc === "boolean" ? c.asc : config.asc;
    },
    arg = arguments;

    if (this === window) {
        if (arg[0]) {
            retrieve_args(arg[1]);

            if (arg[0] instanceof Node) {
                max_length([arg[0]]);
            } else if (arg[0] instanceof NodeList) {
                max_length(arg[0]);
            }
        }
    } else if (this instanceof NodeList) {
        retrieve_args(arg[0]);
        max_length(this);
    } else if (this instanceof Node) {
        retrieve_args(arg[0]);
        max_length([this]);
    }
};
