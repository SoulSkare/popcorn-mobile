            <img src='images/LOGO.png' class="popcorn-logo"/>
            <a class="popcorn-menu-icon" href="#nav-menu"></a>
            <div class="popcorn-search-icon"></div>

<!--		<ul class="nav nav-hor left">
			<li class="source active showMovies"><%= i18n.__("Movies") %></li>
			<li class="source showShows"><%= i18n.__("TV Series") %></li>
		</ul>
		<ul id="nav-filters" class="nav nav-hor filters">
			<li class="dropdown filter genres">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#">
					<%= i18n.__("Genre") %><span class="value"><%= i18n.__(genre.capitalizeEach()) %></span>
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<% _.each(genres, function(c) { %>
					<li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
					<% }); %>
				</ul>
			</li>
			<li class="dropdown filter sorters">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#">
					<%= i18n.__("Sort by") %><span class="value"><%= i18n.__(sorter.capitalizeEach()) %></span>
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<% _.each(sorters, function(c) { %>
					<li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
					<% }); %>
				</ul>
			</li>
		</ul>-->
		<ul id="nav-menu">
		<div class="menu-andriod">
            <ul class="menu-base">
                <li class="selected">Movies</li>
                <li>Tv Series</li>
                <li class="genre-sub-menu">Genre</li>
                <li>Sort By</li>
                <li>Bookmarks</li>
                <li>Setting</li>
                <li>Info</li>
            </ul>
            <div class="sub-menu">
                <div id="menu-back"> < back</div>
                <ul class="menu-genre">
                    <li class="selected">Action</li>
                    <li>Action</li>
                    <li>Action</li>
                    <li>Action</li>
                    <li>Action</li>
                </ul>
            </div>
        </div>
		</ul>