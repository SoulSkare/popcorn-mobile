<header class="bar bar-nav">
	<button id="close-movie-detail" class="btn btn-link btn-nav pull-left">
		<span style="color: #878687;" class="icon icon-left-nav"></span>
		Back
	</button>
	<a class="icon icon-bars pull-right filter-bar-menu" style="color: #3b3940;" href="#"></a>
</header>
<%
	if(typeof backdrop === 'undefined'){ backdrop = ''; }; 
	if(typeof synopsis === 'undefined'){ synopsis = 'Synopsis not available.'; }; 
	if(typeof runtime === 'undefined'){ runtime = 'N/A'; }; 
%>
<div id="movie-backdrop" data-bgr="<%= backdrop %>" class="movie-backdrop">
	<div class="movie-btn-watch">
		<div class="play-icon"></div>
	</div>
	<div class="movie-meta-backround">
		<div class="movie-meta-title"><%= title %></div>

		<div class="movie-details-container">
			<div class="movie-meta-details"><%= year %></div>
			<div class="movie-meta-dot"></div>
			<div class="movie-meta-details"><%= runtime %> min</div>

			<div class="movie-meta-dot"></div>
			<% var p_rating = Math.round(rating) / 2; %>
			<div data-toggle="tooltip" data-placement="right" title="<%= rating %>/10" class="star-container">
				<% for (var i = Math.ceil(p_rating); i < 5; i++) { %>
					<div class="rating-star null"></div>
				<% }; %>
				<% if (p_rating % 1 > 0) { %>
					<div class="rating-star half"></div>
				<% }; %>
				<% for (var i = 1; i <= Math.floor(p_rating); i++) { %>
					<div class="rating-star full"></div>
				<% }; %>
			</div>
			<div data-toggle="tooltip" data-placement="left" title="Health <%= health %>" class="health-icon <%= health %>"></div>
		</div>
	</div>
</div>
<div class="movie-meta-overview"><%= synopsis %></div>
<div class="movie-detail-close"></div>