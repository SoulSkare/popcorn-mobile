    <!-- TODO: need something more sexy 
    <div class="view_movie" style="display:block;height:69px">
		<p class="title" title="<%= title %>"><%= title %></p>
		<p class="year"><%= year %></p>
		<% if(Settings.moviesShowQuality){ %>
			<p class="seasons"><% q720 = torrents["720p"] !== undefined; q1080 = torrents["1080p"] !== undefined;
			if (q720 && q1080) { %>720p/1080p<% }else if (q1080) { %>1080p<% } else { %>720p<% } %>
			</p>
		<% } %>

		   <img src="images/icons/blue-arrow.png" class="popcorn-movie-open-icon"/>
            <div class="popcorn-movie-seperator"></div>
    </div>-->


        <div class="movie-item">
            <div class="movie-item-cover" style="background-image: url(http://zapp.trakt.us/images/posters_movies/187975-300.jpg?2); opacity: 1;"></div>
            <div class="movie-item-meta-title"><%= title %></div>
            <div class="movie-item-meta-year"><%= year %></div>
        </div>