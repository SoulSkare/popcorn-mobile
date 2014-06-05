
	<%  
		if(typeof backdrop === 'undefined'){ backdrop = ''; }; 
		if(typeof synopsis === 'undefined'){ synopsis = 'Synopsis not available.'; }; 
 		if(typeof runtime === 'undefined'){ runtime = 'N/A'; }; 
 	%>
		<div id="movie-backdrop" data-bgr="<%= backdrop %>" class="movie-backdrop">


 <div class="movie-meta-backround">

       

            <div class="movie-meta-title"><%= title %></div>

            <div class="movie-details-container">
                <div class="movie-meta-details"><%= year %></div>
                <div class="movie-meta-dot"></div>
                <div class="movie-meta-details">106 min</div>

                <div class="movie-meta-dot"></div>
 <% var p_rating = Math.round(rating) / 2; %>
			<div data-toggle="tooltip" data-placement="right" title="<%= rating %>/10" class="star-container">
				<% for (var i = 1; i <= Math.floor(p_rating); i++) { %>
					<div class="rating-star full"></div>
				<% }; %>
				<% if (p_rating % 1 > 0) { %>
					<div class="rating-star half"></div>
				<% }; %>
				<% for (var i = Math.ceil(p_rating); i < 5; i++) { %>
					<div class="rating-star null"></div>
				<% }; %>
			</div>


			<div data-toggle="tooltip" data-placement="left" title="Health <%= health %>" class="health-icon <%= health %>"></div>


            </div>


		</div>
   </div>
<div class="movie-meta-overview">Bill Marks is a burned-out veteran of the Air Marshals service. He views the assignment not as a life-saving duty, but as a desk job in the sky. However, today's flight will be no routine trip. Shortly into the transatlantic journey from New York to London, he receives a series of mysterious text messages ordering him to have the government transfer $150 million into a secret account, or a passenger will die every 20 minutes.</div>


 





<!--
		<div class="movie-controlls-container">



			<div class="movie-btn-watch"><div class="movie-watch-now"><div class="play-button"></div></div></div>



		</div>

		<div class="movie-backdrop-overlay"></div>

		<img class="movie-cover-image" src="<%= image %>" />
		<div class="sperator-movie"></div>
		<div class="movie-meta-title"><%= title %></div>
		<div class="movie-quick-info">
			<div class="movie-meta-details"><%= year %></div>
			<div class="movie-dot"></div>
			<% if (synopsis.length > 528) { var synopsis = synopsis.substring(0, 528) + "..."; } %>
			<div class="movie-meta-details"><%= runtime %> min</div>
			<div class="movie-dot"></div>
			<% var p_rating = Math.round(rating) / 2; %>
			<div data-toggle="tooltip" data-placement="right" title="<%= rating %>/10" class="star-container">
				<% for (var i = 1; i <= Math.floor(p_rating); i++) { %>
					<div class="rating-star full"></div>
				<% }; %>
				<% if (p_rating % 1 > 0) { %>
					<div class="rating-star half"></div>
				<% }; %>
				<% for (var i = Math.ceil(p_rating); i < 5; i++) { %>
					<div class="rating-star null"></div>
				<% }; %>
			</div>
			
			<div data-toggle="tooltip" data-placement="left" title="Health <%= health %>" class="health-icon Excellent"></div>
		</div>

		<div class="movie-overview-container">
			<div class="movie-meta-overview"><%= synopsis %></div>
		</div>
-->
		<div class="movie-detail-close"></div>

