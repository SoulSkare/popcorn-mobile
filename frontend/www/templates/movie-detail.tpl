<header class="bar bar-nav">


<button id="back" class="btn btn-link btn-nav pull-left">
    <span class="icon icon-left-nav"></span>
    Back
  </button>
  
  <h1 class="title">Popcorn Time</h1>

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
                <div class="movie-meta-details"><%= runtime %></div>

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


 



		<div class="movie-detail-close"></div>

