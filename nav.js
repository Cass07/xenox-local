(function(window) {

    function NavInitiator() {
        let _nav = {};
        const $navDiv = $("#navbarSupportedContent");
        const $navUl = $navDiv.find("ul");

        _nav.initiate = function (navData) {
            if(navData == null) {
                const navDir = "data/nav.json"
                const navPromise = $.ajax({
                    url: navDir,
                    dataType : 'json'
                });

                Promise.all([navPromise])
                    .then(([navData]) => {
                        updateDiv(navData);
                    });
            } else {
                updateDiv(navData);
            }
        }

        function updateDiv(navData) {
            let navLis = "";
            let currentFile = getCurrentUrl();
            navData.forEach(singleNav => {
                navLis += makeLi(singleNav.title, singleNav.href, currentFile, singleNav.child);
            });
            $navUl.append(navLis);
        }

        function getNavData() {
            const navDir = "data/nav.json"
            const navPromise = $.ajax({
                url: navDir,
                dataType : 'json'
            })

            Promise.all([navPromise])
                .then(([navData]) => {
                    console.log(navData);
                    return navData;
                });
        }

        function getCurrentUrl() {
            let path = new URL(window.location.href).pathname;
            let filename = path.substring(path.lastIndexOf('/') + 1);
            if(filename === "") {
                filename = "index.html";
            }
            return filename;
        }

        function makeLi(title, url, current, child) {
            let active = "";
            let childLis = "";
            let result = "";

            if(url === current) {
                active = " active";
            }

            child.forEach(singleChild => {
                let childActive = "";
                if(singleChild.href === current) {
                    childActive = " active";
                }
                childLis += `<li><a class="dropdown-item${childActive}" href="${singleChild.href}">${singleChild.title}</a></li>`;
            });

            if(childLis !== "") {
                result = `<li class="nav-item dropdonw"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">${title}</a>
                            <ul class = "dropdown-menu" aria-labelledby="navBarDropdown">${childLis}</ul> </li>`;
            } else {
                result = `<li class="nav-item"><a class="nav-link${active}" href="${url}">${title}</a></li>`;
            }

            return result;
        }
        return _nav;
    }

    if (typeof window.NavInitiator === 'undefined') {
        window.NavInitiator = NavInitiator();
    }

})(window);