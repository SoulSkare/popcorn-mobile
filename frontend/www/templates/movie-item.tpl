
		<p class="title" title="<%= title %>"><%= title %></p>
		<p class="year"><%= year %></p>
		<% if(Settings.moviesShowQuality){ %>
			<p class="seasons"><% q720 = torrents["720p"] !== undefined; q1080 = torrents["1080p"] !== undefined;
			if (q720 && q1080) { %>720p/1080p<% }else if (q1080) { %>1080p<% } else { %>720p<% } %>
			</p>
		<% } %>

		            <div class="popcorn-movie-open-icon"></div>
            <div class="popcorn-movie-seperator"></div>

