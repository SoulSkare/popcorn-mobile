
    <a class="icon icon-search pull-right" href="#"></a>
    <a class="icon icon-bars pull-right filter-bar-menu" href="#"></a>
    <h1 class="title">Popcorn Time</h1>


<div class="menu-overlay"></div>
<div class="menu">
    <ul class="menu-base">
        <li class="selected showMovies">Movies</li>
        <li class="genre-sub-menu">Genre</li>
        <li>Sort By</li>
    </ul>
    <div class="sub-menu">
        <div> < back</div>
        <ul class="menu-genre">
            <% _.each(genres, function(c) { %>
                <li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
            <% }); %>
        </ul>
    </div>
</div>