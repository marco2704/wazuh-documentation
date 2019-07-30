jQuery(function($){

    /*
    * Wazuh documentation - Version selector script
    * Copyright (C) 2019 Wazuh, Inc.
    */


    var current_version = "3.9-new-design-fullmenu";

    var versions = [
        {name: "3.9 (current)", url: "/"+current_version},
        {name: "3.8", url: "/3.8-new-design"},
        {name: "3.7", url: "/3.7-new-design"},
        {name: "3.6", url: "/3.6-new-design"},
        {name: "3.5", url: "/3.5-new-design"},
        {name: "3.4", url: "/3.4-new-design"},
        {name: "3.3", url: "/3.3-new-design"},
        {name: "3.2", url: "/3.2-new-design"},
        {name: "3.1", url: "/3.1-new-design"},
        {name: "3.0", url: "/3.0-new-design"},
        {name: "2.1", url: "/2.1-new-design"},];

    addVersions();
		checkLatestDocs();

    function addVersions() {
        var ele = '';
        var selected = -1;
        var version = $(".version");
        var select_version = $("#select-version");
        var select_version_current = $("#select-version .current");
        var select_version_ul = $("#select-version .dropdown-menu");
        var path = document.location.pathname.split('/')[1];
				var page = "";
        if (version == null) {
            console.error("No such element of class 'version'");
            return;
        }

        if (select_version == null) {
            console.error("No such element 'select-version'");
            return;
        }

        if (path == "current" || path == "3.x" ) {
            path = current_version;
        }

				page = document.location.pathname.split('/'+path)[1]; // Gets the page of the documentation that it's been visited

        for (var i = 0; i < versions.length; i++) {
            ele += "<li><a href='" + versions[i].url + page + "'>"+versions[i].name+"</a></li>";
            if ( versions[i].url == '/' + path ) {
              selected = i;
            }
        }
        select_version_ul.append(ele);
        select_version_current.html(versions[selected].name);

    }

		function checkLatestDocs(){
			/* Shows a warning message to the user if current doc version is not the latest version */
			/* Note: For this to work, it requires the documentation version variable (in file conf.py) and the array of versions (in this script) to be updated */
			var currentVersion = document.querySelector('.no-latest-notice').getAttribute('data-version');
			var latestVersion = versions[0].url.replace('/','');
			var page = "";
			if ( currentVersion !== latestVersion ){
				var pageID = document.querySelector('#page');
				pageID.classList.add('no-latest-docs');
			}

			// Updates link to the latest version with the correct path (documentation's home)
			page = document.location.pathname.split('/'+currentVersion)[1];
			var link = document.querySelector('.link-latest');
			link.setAttribute('href', 'https://' + window.location.hostname + '/' + latestVersion + page);
		}

});
