<header id="movie-list-header" class="bar bar-nav">
    <a class="icon icon-more-vertical pull-right filter-bar-menu" href="#"></a>
    <a class="icon icon-search pull-right" href="#"></a>
<img class="header-logo" src="images/logo.png"/>
    <h1 class="popcorn-title">Popcorn Time</h1>


</header>

<div class="menu-overlay"></div>
<div class="menu">
    <ul class="menu-base">
        <li class="selected showMovies">Movies</li>
        <li class="genre-sub-menu">Genre</li>
        <li class="genre-sort-by">Sort By</li>
    </ul>
    <div class="sub-menu">
        <div> < back</div>
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