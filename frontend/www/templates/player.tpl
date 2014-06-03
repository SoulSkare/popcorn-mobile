<div class="player-header-background vjs-control-bar">
	<div class="player-title"><%= title %></div>
	<div class="details-player">
		<span class="close-info-player"></span>
	</div>
</div>
<video id="video_player" width="100%" height="100%" class="video-js vjs-popcorn-skin" controls preload autoplay >
	<source src="<%= src %>" type="<%= type %>" />
</video>