<header id="movie-list-header" class="bar bar-nav">
    <img class="header-logo" src="images/logo.png"/>
    <h1 class="popcorn-title">Popcorn Time</h1>
    <div class="search-base">
        <button id="close-search-menu" class="btn btn-link btn-nav pull-left close-search-menu">
            <span style="color: #878687;" class="icon icon-right-nav close-search-menu"></span>
        </button>
        <input type="text" class="search-input" id="search_menu" name="search_menu" placeholder="Search">
        <button id="search-check" class="btn btn-link btn-nav pull-left search-check">
            <span style="color: #878687;" class="icon icon-check search-check"></span>
        </button>
    </div>
    <a class="icon icon-bars pull-right filter-bar-menu" style="color: #3b3940;" href="#"></a>
    <a style="color: #878687;" class="icon icon-search pull-right" href="#"></a>
</header>

<div class="menu-overlay"></div>
<div class="menu">
    <ul class="menu-base">
        <li class="selected showMovies">Movies</li>
        <li class="genre-sub-menu">Genre</li>
        <li class="genre-choosed">All</li>
        <li class="genre-sort-by">Sort By</li>
        <li class="genre-sort-by-choosed">Popularity</li>
    </ul>
    <div class="sub-menu">
        <div><span class="icon icon-left-nav"></span> back</div>
        <ul class="menu-genre">
            <% _.each(genres, function(c) { %>
                <li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
            <% }); %>
        </ul>
        <ul class="menu-sort-by">
            <% _.each(sorters, function(c) { %>
                <li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
            <% }); %>
        </ul>
    </div>
</div>